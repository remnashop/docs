'use client';

import { useEffect, useRef, useSyncExternalStore } from 'react';
import { Zap, ZapOff } from 'lucide-react';


// Flat rgb triplets of #0f1629, #050d0d, #ffffff, #998066: the cosine gradient's a, b, c, d.
const PALETTE = [
  0x0f / 255, 0x16 / 255, 0x29 / 255,
  0x05 / 255, 0x0d / 255, 0x0d / 255,
  1, 1, 1,
  0x99 / 255, 0x80 / 255, 0x66 / 255,
];
const OPACITY = 0.5;
// uTime at wall-clock speed reads as jittery; slows the motion without touching the noise math
const TIME_SCALE = 0.2;

const MIN_FRAME_INTERVAL_MS = 1000 / 30;
const BUFFER_SCALE = 0.5;
// No input for this long and the animation eases to a stop, freeing the GPU
const IDLE_TIMEOUT_MS = 30_000;
const EASE_DURATION_MS = 2_000;
const ACTIVITY_EVENTS = ['pointermove', 'pointerdown', 'keydown', 'wheel', 'touchstart', 'scroll'] as const;

// The visitor's choice to switch the shader off, remembered in this browser only. Kept in
// memory too, so the switch still works where storage is blocked.
const MUTED_KEY = 'remnashop-docs.shader-muted';
let mutedInMemory = false;
const mutedListeners = new Set<() => void>();

function readMuted() {
  try {
    const stored = localStorage.getItem(MUTED_KEY);
    return stored === null ? mutedInMemory : stored === '1';
  } catch {
    return mutedInMemory;
  }
}

function writeMuted(muted: boolean) {
  mutedInMemory = muted;
  try {
    localStorage.setItem(MUTED_KEY, muted ? '1' : '0');
  } catch {}
  mutedListeners.forEach((listener) => listener());
}

function subscribeMuted(listener: () => void) {
  mutedListeners.add(listener);
  return () => {
    mutedListeners.delete(listener);
  };
}

// One oversized triangle over the viewport, generated from gl_VertexID; no vertex buffer.
const VERTEX_SHADER = `#version 300 es
out vec2 vUv;

void main() {
  vec2 position = vec2(gl_VertexID == 1 ? 3.0 : -1.0, gl_VertexID == 2 ? 3.0 : -1.0);
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uTimeSin;
uniform float uScrollProgress;
uniform float uOpacity;
uniform vec3 uColourPalette[4];

in vec2 vUv;
out vec4 fragColor;

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
  return mod289(((x * 34.0) + 1.0) * x);
}

vec4 taylorInvSqrt(vec4 r) {
  return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

vec3 cosineGradientColour(in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d) {
  return clamp(a + b * cos(6.28318 * (c * t + d)), 0.0, 1.0);
}

void main() {
  vec2 uv = vUv;
  uv.x += uScrollProgress;
  uv.x /= 1.2;

  for (float i = 0.0; i < 3.0; i++) {
    uv += snoise(vec3(uv - i * 0.2, uTime + i * 32.0)) * 0.15;
  }

  float colourInput = snoise(vec3(uv, uTimeSin)) * 0.5 + 0.5;
  vec3 colour = cosineGradientColour(colourInput, uColourPalette[0], uColourPalette[1], uColourPalette[2], uColourPalette[3]);
  fragColor = vec4(colour * 1.4 * uOpacity, uOpacity);
}
`;

function compileProgram(gl: WebGL2RenderingContext): WebGLProgram | null {
  const program = gl.createProgram();
  for (const [type, source] of [
    [gl.VERTEX_SHADER, VERTEX_SHADER],
    [gl.FRAGMENT_SHADER, FRAGMENT_SHADER],
  ] as const) {
    const shader = gl.createShader(type)!;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    gl.attachShader(program, shader);
    gl.deleteShader(shader); // only flagged, freed with the program
  }
  gl.linkProgram(program);
  if (gl.getProgramParameter(program, gl.LINK_STATUS)) return program;
  console.error('ShaderBackground: shader link failed', gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
  return null;
}

/** Noise-gradient background on one full-viewport canvas, with a corner switch to turn it off. */
export function ShaderBackground({ lang }: { lang: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // null on the server and while hydrating, so both renders agree; the stored choice after
  const muted = useSyncExternalStore(subscribeMuted, readMuted, () => null);

  // A muted shader doesn't just hide: nothing is set up, so the GPU stays idle.
  useEffect(() => {
    if (muted !== false) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    let gl: WebGL2RenderingContext | null;
    try {
      gl = canvas.getContext('webgl2');
    } catch {
      gl = null;
    }
    if (!gl) return;
    const program = compileProgram(gl);
    if (!program) return;
    // `gl` narrowing doesn't survive into the closures below
    const context = gl;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Half a CSS pixel per buffer pixel, upscaled by the browser: every fragment costs
    // 4 snoise() calls, and a low-frequency gradient has no detail to lose at quarter density.
    const resize = () => {
      canvas.width = Math.ceil(window.innerWidth * BUFFER_SCALE);
      canvas.height = Math.ceil(window.innerHeight * BUFFER_SCALE);
      context.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();

    context.useProgram(program);
    const location = (name: string) => context.getUniformLocation(program, name);
    const uTime = location('uTime');
    const uTimeSin = location('uTimeSin');
    const uScrollProgress = location('uScrollProgress');
    context.uniform1f(location('uOpacity'), OPACITY);
    context.uniform3fv(location('uColourPalette'), PALETTE);

    let elapsed = 0;
    let scrollProgress = 0;

    function renderFrame() {
      context.uniform1f(uTime, elapsed);
      context.uniform1f(uTimeSin, Math.sin(elapsed));
      context.uniform1f(uScrollProgress, scrollProgress);
      context.drawArrays(context.TRIANGLES, 0, 3);
    }
    renderFrame();

    function onResize() {
      resize();
      renderFrame();
    }
    window.addEventListener('resize', onResize);

    function onScroll() {
      scrollProgress = window.scrollY * 0.0005;
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    let frame = 0;

    function onContextLost() {
      // No preventDefault(): it promises a restore this code never does, and Safari
      // then cycles lost/restored forever. A permanent hide is fine for decoration.
      stop();
      canvas!.style.display = 'none';
    }
    canvas.addEventListener('webglcontextlost', onContextLost, false);

    // Time is accumulated per frame rather than derived from a start timestamp,
    // so pauses (blur, idle) and the idle ease both keep uTime continuous.
    let lastTick = performance.now();
    let lastDraw = 0;
    let lastActivity = lastTick;
    // 0..1 multiplier on animation speed, eased toward 0 while idle
    let motion = 1;
    let running = false;

    function render() {
      const now = performance.now();
      if (running) {
        frame = requestAnimationFrame(render);
      }
      // the motion is slow enough that 30fps looks the same as the display rate
      if (now - lastDraw < MIN_FRAME_INTERVAL_MS) return;
      lastDraw = now;
      const dt = now - lastTick;
      lastTick = now;

      const idle = now - lastActivity > IDLE_TIMEOUT_MS;
      motion = Math.min(1, Math.max(0, motion + (idle ? -dt : dt) / EASE_DURATION_MS));
      const eased = motion * motion * (3 - 2 * motion);
      elapsed += (dt / 1000) * TIME_SCALE * eased;

      renderFrame();
      if (idle && motion === 0) stop();
    }

    function start() {
      if (running || context.isContextLost()) return;
      running = true;
      lastTick = performance.now();
      render();
    }

    function stop() {
      running = false;
      cancelAnimationFrame(frame);
    }

    function onActivity() {
      lastActivity = performance.now();
      start();
    }

    if (reduceMotion) {
      render();
    } else {
      start();
      // rAF stops only when the tab is hidden, not on blur
      window.addEventListener('blur', stop);
      window.addEventListener('focus', onActivity);
      for (const event of ACTIVITY_EVENTS) window.addEventListener(event, onActivity, { passive: true });
    }

    return () => {
      stop();
      window.removeEventListener('blur', stop);
      window.removeEventListener('focus', onActivity);
      for (const event of ACTIVITY_EVENTS) window.removeEventListener(event, onActivity);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
      canvas.removeEventListener('webglcontextlost', onContextLost);
      context.deleteProgram(program);
    };
  }, [muted]);

  const ru = lang === 'ru';
  const label = muted ? (ru ? 'Включить анимацию фона' : 'Turn the background on') : ru ? 'Выключить анимацию фона' : 'Turn the background off';

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`pointer-events-none fixed inset-0 -z-20 size-full ${muted ? 'hidden' : ''}`}
      />
            <button
        type="button"
        onClick={() => writeMuted(!muted)}
        aria-label={label}
        title={label}
        className="border-fd-border text-fd-muted-foreground hover:text-fd-foreground fixed right-4 bottom-4 z-40 flex size-9 items-center justify-center rounded-full border bg-white/[0.05] backdrop-blur-md transition-colors hover:bg-white/[0.08]"
      >
        {muted ? <ZapOff className="size-[17px]" /> : <Zap className="size-[17px]" />}
      </button>
    </>
  );
}

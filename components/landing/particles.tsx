'use client';

import { useEffect, useRef } from 'react';

const COUNT = 140;

// Coordinate space the particles drift in; the SVG stretches it to fill the container.
const VIEW_X = 34.23;
const VIEW_Y = 16;

type Particle = {
  x: number;
  y: number;
  angle: number;
  speed: number;
  spin: number;
  life: number;
  lifespan: number;
  scale: number;
  opacity: number;
};

function spawn(): Particle {
  const angle = Math.random() * Math.PI * 2;

  return {
    x: (Math.random() * 2 - 1) * VIEW_X,
    y: (Math.random() * 2 - 1) * VIEW_Y,
    angle,
    speed: 0.6 + Math.random() * 1.6,
    spin: (Math.random() * 2 - 1) * 12,
    life: Math.random() * 6,
    lifespan: 6 + Math.random() * 8,
    scale: 0.35 + Math.random() * 0.6,
    opacity: 0.25 + Math.random() * 0.75,
  };
}

export function Particles() {
  const groups = useRef<(SVGGElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const particles = Array.from({ length: COUNT }, spawn);
    let frame = 0;
    let previous = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - previous) / 1000, 0.05);
      previous = now;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const node = groups.current[i];
        if (!node) continue;

        p.x += Math.cos(p.angle) * p.speed * dt;
        p.y += Math.sin(p.angle) * p.speed * dt;
        p.angle += p.spin * 0.001;
        p.life += dt;

        if (p.life > p.lifespan || Math.abs(p.x) > VIEW_X * 1.2 || Math.abs(p.y) > VIEW_Y * 1.2) {
          particles[i] = spawn();
          particles[i].life = 0;
          continue;
        }

        // Grow in and shrink out over the lifetime, so particles never pop.
        const scale = Math.sin((Math.PI * p.life) / p.lifespan) * p.scale;
        const rotation = (p.angle * 180) / Math.PI - 90;

        node.setAttribute(
          'transform',
          `translate(${p.x.toFixed(3)} ${p.y.toFixed(3)}) rotate(${rotation.toFixed(2)}) scale(${scale.toFixed(4)})`,
        );
        node.setAttribute('opacity', p.opacity.toFixed(3));
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <svg
      aria-hidden="true"
      className="text-fd-primary absolute inset-0 size-full"
      preserveAspectRatio="none"
      viewBox={`${-VIEW_X} ${-VIEW_Y} ${VIEW_X * 2} ${VIEW_Y * 2}`}
    >
      {Array.from({ length: COUNT }, (_, i) => (
        <g
          key={i}
          ref={(node) => {
            groups.current[i] = node;
          }}
          opacity="0"
          transform="scale(0)"
        >
          <rect x="-0.1" y="-0.3" width="0.2" height="0.6" rx="0.1" fill="currentColor" />
        </g>
      ))}
    </svg>
  );
}

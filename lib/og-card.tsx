import { appName, ogAccent } from './shared';

// The share card is drawn by Satori inside ImageResponse: flexbox, transforms and gradients
// only, no canvas and no animation. It restates the landing — the capsule particles frozen
// mid-drift behind the logo — instead of using the default fumadocs template.

const WIDTH = 1200;
const HEIGHT = 630;
const CAPSULES = 44;

/** Deterministic PRNG: the same page must produce the same image on every build. */
function random(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seedFrom(text: string) {
  let hash = 0;
  for (let i = 0; i < text.length; i++) hash = (Math.imul(hash, 31) + text.charCodeAt(i)) | 0;
  return hash;
}

// Same shape as the landing particles: a narrow rounded bar, tilted, scattered and faded.
function capsules(seed: number) {
  const next = random(seed);

  return Array.from({ length: CAPSULES }, (_, i) => {
    const scale = 0.4 + next() * 0.9;
    const width = Math.round(13 * scale);

    return (
      <div
        key={i}
        style={{
          position: 'absolute',
          left: Math.round(next() * (WIDTH + 120)) - 60,
          top: Math.round(next() * (HEIGHT + 120)) - 60,
          width,
          height: Math.round(width * 3),
          borderRadius: width,
          backgroundColor: ogAccent,
          opacity: 0.06 + next() * 0.3,
          transform: `rotate(${Math.round(next() * 180 - 90)}deg)`,
        }}
      />
    );
  });
}

function Logo({ size }: { size: number }) {
  const bars: [number, number, number][] = [
    [13.47, 36.64, 10.24],
    [21.97, 31.11, 21.51],
    [31.6, 23.12, 38.92],
    [39.79, 34.59, 14.54],
    [47.68, 30.8, 23.14],
  ];

  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      {bars.map(([x, y, height]) => (
        <rect
          key={x}
          x={x}
          y={y}
          width="2.25"
          height={height}
          rx="1.13"
          fill={ogAccent}
          stroke={ogAccent}
          strokeWidth="2.25"
        />
      ))}
      <path
        d="M31.699 1C42.389 1 51.0548 9.66586 51.0548 20.3557C51.0548 21.6001 50.0461 22.6088 48.8018 22.6088C47.5575 22.6088 46.5487 21.6001 46.5487 20.3557C46.5487 12.1545 39.9003 5.5061 31.699 5.5061C23.4978 5.5061 16.8494 12.1545 16.8494 20.3557C16.8494 21.6001 15.8406 22.6088 14.5963 22.6088C13.352 22.6088 12.3433 21.6001 12.3433 20.3557C12.3433 9.66586 21.0091 1 31.699 1Z"
        fill={ogAccent}
      />
    </svg>
  );
}

export function OgCard({
  title,
  description,
  footer,
}: {
  title: string;
  description?: string;
  footer: string;
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        padding: '72px',
        color: '#e8ecfb',
        backgroundColor: '#01030f',
        // Mirrors the page gradient: lighter navy at the top, near black at the bottom.
        backgroundImage: 'linear-gradient(170deg, #101838 0%, #01030f 65%)',
        position: 'relative',
      }}
    >
      {capsules(seedFrom(title))}

      {/* Keeps the copy legible: capsules stay visible on the right, fade out under the text. */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(100deg, rgba(1,3,15,0.94) 0%, rgba(1,3,15,0.78) 42%, rgba(1,3,15,0) 78%)',
        }}
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
        <Logo size={64} />
        <span style={{ fontSize: '38px', fontWeight: 600, letterSpacing: '-0.01em' }}>
          {appName}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <span
          style={{
            fontSize: title.length > 34 ? '68px' : '82px',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {title}
        </span>
        {description ? (
          <span style={{ fontSize: '38px', lineHeight: 1.3, color: '#8b93b8' }}>{description}</span>
        ) : null}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{ width: '52px', height: '5px', borderRadius: '5px', backgroundColor: ogAccent }} />
        <span style={{ fontSize: '30px', color: ogAccent }}>{footer}</span>
      </div>
    </div>
  );
}

export const ogSize = { width: WIDTH, height: HEIGHT };

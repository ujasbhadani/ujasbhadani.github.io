// Abstract card art, generated in code (no stock photos). Deterministic per
// seed so the prerendered HTML and the client render match. Palette is the
// site's accent blues on near-black.

function rng(seed: number) {
  let a = (seed * 2654435761) >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const BLUES = ["#89AACC", "#4E85BF", "#2F5F94", "#A9C3DD"] as const;

export function CardArt({ seed, className = "" }: { seed: number; className?: string }) {
  const r = rng(seed + 7);
  const id = `art-${seed}`;
  const variant = seed % 3;
  const shapes: React.ReactNode[] = [];

  if (variant === 0) {
    // Concentric arcs.
    const cx = 120 + r() * 160;
    const cy = 80 + r() * 140;
    for (let i = 0; i < 9; i++) {
      shapes.push(
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={24 + i * 26}
          fill="none"
          stroke={BLUES[i % 3]}
          strokeWidth={1 + (i % 3)}
          strokeOpacity={0.14 + r() * 0.3}
        />,
      );
    }
  } else if (variant === 1) {
    // Diagonal line field.
    for (let i = 0; i < 22; i++) {
      const x = -60 + i * 22;
      shapes.push(
        <line
          key={i}
          x1={x}
          y1={0}
          x2={x + 120 + r() * 120}
          y2={300}
          stroke={BLUES[i % 4]}
          strokeWidth={1 + r() * 2}
          strokeOpacity={0.1 + r() * 0.35}
        />,
      );
    }
  } else {
    // Grid of dots and blocks.
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 11; x++) {
        const v = r();
        if (v < 0.55) continue;
        shapes.push(
          <rect
            key={`${x}-${y}`}
            x={20 + x * 34}
            y={20 + y * 34}
            width={v > 0.85 ? 26 : 8}
            height={v > 0.85 ? 26 : 8}
            rx={v > 0.85 ? 6 : 4}
            fill={BLUES[(x + y) % 4]}
            fillOpacity={0.15 + v * 0.45}
          />,
        );
      }
    }
  }

  const gx = 20 + r() * 60;
  const gy = 20 + r() * 60;
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      role="presentation"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <defs>
        <radialGradient id={`${id}-glow`} cx={`${gx}%`} cy={`${gy}%`} r="80%">
          <stop offset="0%" stopColor="#4E85BF" stopOpacity="0.55" />
          <stop offset="55%" stopColor="#1B3556" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#0A0A0A" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-base`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#101826" />
          <stop offset="100%" stopColor="#0A0A0A" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#${id}-base)`} />
      <rect width="400" height="300" fill={`url(#${id}-glow)`} />
      {shapes}
    </svg>
  );
}

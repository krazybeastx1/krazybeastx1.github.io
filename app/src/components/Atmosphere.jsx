const PARTICLES = [
  { x: 8, y: 22, size: 3, delay: 0, duration: 22, drift: 18 },
  { x: 18, y: 68, size: 2, delay: 3, duration: 27, drift: -14 },
  { x: 27, y: 34, size: 2, delay: 6, duration: 19, drift: 12 },
  { x: 36, y: 82, size: 3, delay: 1.5, duration: 24, drift: -20 },
  { x: 44, y: 16, size: 2, delay: 8, duration: 30, drift: 16 },
  { x: 53, y: 58, size: 2, delay: 4.5, duration: 21, drift: -12 },
  { x: 61, y: 28, size: 3, delay: 9, duration: 26, drift: 22 },
  { x: 68, y: 74, size: 2, delay: 2, duration: 23, drift: -18 },
  { x: 75, y: 42, size: 2, delay: 7, duration: 28, drift: 14 },
  { x: 82, y: 12, size: 3, delay: 5, duration: 25, drift: -16 },
  { x: 88, y: 62, size: 2, delay: 10, duration: 32, drift: 20 },
  { x: 93, y: 36, size: 2, delay: 3.5, duration: 20, drift: -10 },
  { x: 13, y: 48, size: 2, delay: 11, duration: 29, drift: 15 },
  { x: 71, y: 91, size: 2, delay: 6.5, duration: 22, drift: -13 },
];

/**
 * Fixed atmospheric backdrop: layered violet fog, drifting particles, a
 * vignette and a faint grain. Everything is transform/opacity only so the
 * compositor does the work and no continuous JS runs.
 */
export default function Atmosphere() {
  return (
    <div className="atmosphere" aria-hidden="true">
      <div className="atmosphere__fog atmosphere__fog--violet" />
      <div className="atmosphere__fog atmosphere__fog--blue" />
      <div className="atmosphere__fog atmosphere__fog--deep" />
      <div className="atmosphere__streak" />

      <div className="atmosphere__particles">
        {PARTICLES.map((particle) => (
          <span
            key={`${particle.x}-${particle.y}`}
            className="atmosphere__particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: `-${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
              '--drift': `${particle.drift}px`,
            }}
          />
        ))}
      </div>

      <div className="atmosphere__vignette" />
      <div className="atmosphere__grain" />
    </div>
  );
}

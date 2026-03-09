// Decorative matrix rain for the intro screen
export function MatrixRain() {
  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', opacity: 0.12, zIndex: 0, pointerEvents: 'none' }}>
      {Array(25).fill(0).map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: 0,
            left: `${i * 4}%`,
            color: '#859900',
            fontSize: '0.65rem',
            lineHeight: 1.2,
            animation: `matrix ${1.2 + (i % 5) * 0.4}s ease-in-out infinite alternate`,
            animationDelay: `${(i % 7) * 0.3}s`,
          }}
        >
          {Array(35).fill(0).map((_, j) => (
            <div key={j}>{String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96))}</div>
          ))}
        </div>
      ))}
    </div>
  );
}

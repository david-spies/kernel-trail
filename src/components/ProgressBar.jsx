// ASCII-style progress bar: [||||||||||----------] 45%
export function ProgressBar({ value, max, color = '#859900', label = '' }) {
  const pct = Math.min(100, Math.max(0, Math.round((value / max) * 100)));
  const filled = Math.round(pct / 5);
  const empty = 20 - filled;

  return (
    <div style={{ fontFamily: 'monospace', fontSize: '0.72rem', lineHeight: 1 }}>
      <span style={{ color: '#586e75' }}>[</span>
      <span style={{ color }}>{Array(filled).fill('|').join('')}</span>
      <span style={{ color: '#073642' }}>{Array(empty).fill('-').join('')}</span>
      <span style={{ color: '#586e75' }}>]</span>
      {label && (
        <span style={{ color: '#93a1a1', marginLeft: '0.5rem' }}>
          {pct}% {label}
        </span>
      )}
    </div>
  );
}

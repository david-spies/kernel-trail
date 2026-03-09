// CRT scanline overlay — fixed position, pointer-events: none
export function Scanlines() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed', inset: 0,
        pointerEvents: 'none', zIndex: 9999,
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.07) 2px, rgba(0,0,0,0.07) 4px)',
      }}
    />
  );
}

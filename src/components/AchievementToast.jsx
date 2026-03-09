import { useEffect } from 'react';
import { useGameStore } from '../stores/gameStore';

export function AchievementToast() {
  const toast = useGameStore((s) => s.toastAchievement);
  const dismiss = useGameStore((s) => s.dismissToast);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(dismiss, 4200);
    return () => clearTimeout(t);
  }, [toast, dismiss]);

  if (!toast) return null;

  return (
    <div
      onClick={dismiss}
      style={{
        position: 'fixed', top: '1rem', right: '1rem', zIndex: 10000,
        background: '#073642', border: '2px solid #859900',
        padding: '1rem 1.5rem', fontFamily: 'monospace',
        boxShadow: '0 0 20px rgba(133,153,0,0.5)',
        maxWidth: '300px', cursor: 'pointer',
        animation: 'slideIn 0.3s ease-out',
      }}
    >
      <div style={{ color: '#859900', fontSize: '0.65rem', marginBottom: '0.25rem', letterSpacing: '0.15em' }}>
        // ACHIEVEMENT UNLOCKED
      </div>
      <div style={{ color: '#fdf6e3', fontSize: '1.3rem', marginBottom: '0.25rem' }}>
        {toast.icon} {toast.name}
      </div>
      <div style={{ color: '#586e75', fontSize: '0.72rem', lineHeight: 1.4 }}>{toast.desc}</div>
    </div>
  );
}

// ============================================================
// HOOK: useKeyboardShortcuts
// Global keyboard shortcuts for the game
// ============================================================

import { useEffect } from 'react';

/**
 * @param {Object} handlers - Map of key to handler function
 * @param {boolean} active - Whether shortcuts are enabled
 */
export function useKeyboardShortcuts(handlers, active = true) {
  useEffect(() => {
    if (!active) return;

    const handleKeyDown = (e) => {
      const handler = handlers[e.key];
      if (handler) handler(e);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlers, active]);
}

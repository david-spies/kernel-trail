// ============================================================
// HOOK: useOverclock
// Manages the 60-second overclock countdown timer
// ============================================================

import { useEffect, useRef } from 'react';
import { useGameStore } from '../stores/gameStore';

export function useOverclock() {
  const overclock = useGameStore((s) => s.overclock);
  const tickOverclock = useGameStore((s) => s.tickOverclock);
  const timerRef = useRef(null);

  useEffect(() => {
    if (overclock) {
      timerRef.current = setInterval(tickOverclock, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [overclock, tickOverclock]);
}

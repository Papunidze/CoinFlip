import { useState, useCallback, useEffect, useRef } from 'react';
import type { CoinSide, AnimationPhase } from '@shared/types';
import { RESULT_DISPLAY, SPIN_DURATION } from '../model/animation';

interface UseCoinFlipReturn {
  phase: AnimationPhase;
  result: CoinSide | null;
  hasWon: boolean | null;
  flip: (choice: CoinSide) => void;
}

export function useCoinFlip(): UseCoinFlipReturn {
  const [phase, setPhase] = useState<AnimationPhase>('idle');
  const [result, setResult] = useState<CoinSide | null>(null);
  const [hasWon, setHasWon] = useState<boolean | null>(null);
  const timeouts = useRef<number[]>([]);

  const clearTimeouts = useCallback(() => {
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];
  }, []);

  const flip = useCallback(
    (choice: CoinSide) => {
      if (phase !== 'idle') return;

      clearTimeouts();

      const finalSide: CoinSide = Math.random() < 0.5 ? 'heads' : 'tails';

      setResult(finalSide);
      setHasWon(null);
      setPhase('spinning');

      const t1 = window.setTimeout(() => {
        setPhase('result');
        setHasWon(choice === finalSide);

        const t2 = window.setTimeout(() => {
          setPhase('idle');
        }, RESULT_DISPLAY);

        timeouts.current.push(t2);
      }, SPIN_DURATION);

      timeouts.current.push(t1);
    },
    [phase, clearTimeouts],
  );

  useEffect(() => clearTimeouts, [clearTimeouts]);

  return { phase, result, hasWon, flip };
}

import { useState, useCallback, useEffect, useRef } from 'react';
import type {
  CoinSide,
  AnimationPhase,
  Currency,
  BetResult,
} from '@shared/types';
import { RESULT_DISPLAY, SPIN_DURATION } from '../model/animation';
import { mockApi } from '@api/mockApi';

interface UseCoinFlipOptions {
  onBetComplete?: (result: BetResult) => void;
}

interface UseCoinFlipReturn {
  phase: AnimationPhase;
  result: CoinSide | null;
  hasWon: boolean | null;
  flip: (choice: CoinSide, amount: number, currency: Currency) => Promise<void>;
}

export function useCoinFlip({
  onBetComplete,
}: UseCoinFlipOptions = {}): UseCoinFlipReturn {
  const [phase, setPhase] = useState<AnimationPhase>('idle');
  const [result, setResult] = useState<CoinSide | null>(null);
  const [hasWon, setHasWon] = useState<boolean | null>(null);
  const timeouts = useRef<number[]>([]);
  const phaseRef = useRef<AnimationPhase>('idle');

  const clearTimeouts = useCallback(() => {
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];
  }, []);

  const flip = useCallback(
    async (
      choice: CoinSide,
      amount: number,
      currency: Currency,
    ): Promise<void> => {
      if (phaseRef.current !== 'idle') return;

      clearTimeouts();
      phaseRef.current = 'spinning';
      setResult(null);
      setHasWon(null);
      setPhase('spinning');

      const [betResult] = await Promise.all([
        mockApi.flipCoin(amount, currency),
        new Promise<void>((resolve) => {
          const t = window.setTimeout(resolve, SPIN_DURATION);
          timeouts.current.push(t);
        }),
      ]);

      const finalSide: CoinSide = betResult.isWin
        ? choice
        : choice === 'heads'
          ? 'tails'
          : 'heads';

      phaseRef.current = 'result';
      setResult(finalSide);
      setHasWon(betResult.isWin);
      setPhase('result');
      onBetComplete?.(betResult);

      // Wait for result display then resolve — lets callers await the full cycle
      await new Promise<void>((resolve) => {
        const t2 = window.setTimeout(() => {
          phaseRef.current = 'idle';
          setPhase('idle');
          resolve();
        }, RESULT_DISPLAY);
        timeouts.current.push(t2);
      });
    },
    [clearTimeouts, onBetComplete],
  );

  useEffect(() => clearTimeouts, [clearTimeouts]);

  return { phase, result, hasWon, flip };
}

import { useState, useCallback, useEffect, useRef } from 'react';
import type {
  CoinSide,
  AnimationPhase,
  Currency,
  History,
} from '@shared/types';
import { RESULT_DISPLAY, SPIN_DURATION } from '../model/animation';
import { useFlipCoin } from '../data-accses/action';

interface UseCoinFlipOptions {
  onBetComplete?: (result: History) => void;
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
  const { mutateAsync: flipCoin } = useFlipCoin();

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
      betAmount: number,
      currency: Currency,
    ): Promise<void> => {
      if (phaseRef.current !== 'idle') return;

      clearTimeouts();
      phaseRef.current = 'spinning';
      setResult(null);
      setHasWon(null);
      setPhase('spinning');
      const [betResult] = await Promise.all([
        flipCoin({ currency, betAmount }),
        new Promise<void>((r) => setTimeout(r, SPIN_DURATION)),
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

      await new Promise<void>((resolve) => {
        const t2 = window.setTimeout(() => {
          phaseRef.current = 'idle';
          setPhase('idle');
          resolve();
        }, RESULT_DISPLAY);
        timeouts.current.push(t2);
      });
    },
    [clearTimeouts, onBetComplete, flipCoin],
  );

  useEffect(() => clearTimeouts, [clearTimeouts]);

  return { phase, result, hasWon, flip };
}

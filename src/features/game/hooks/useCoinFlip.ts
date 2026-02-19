import { useState, useCallback, useEffect, useRef } from 'react';
import type {
  CoinSide,
  AnimationPhase,
  Currency,
  History,
} from '@shared/types';
import { RESULT_DISPLAY, SPIN_DURATION } from '../model/animation';
import { useFlipCoin } from '../data-access/action';
import { AnimationPhaseEnum, CoinSideEnum } from '@shared/types/coin';

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
  const { mutateAsync: flipCoin, invalidateAfterFlip } = useFlipCoin();

  const [phase, setPhase] = useState<AnimationPhase>(AnimationPhaseEnum.IDLE);
  const [result, setResult] = useState<CoinSide | null>(null);
  const [hasWon, setHasWon] = useState<boolean | null>(null);
  const timeouts = useRef<number[]>([]);
  const phaseRef = useRef<AnimationPhase>(AnimationPhaseEnum.IDLE);

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
      if (phaseRef.current !== AnimationPhaseEnum.IDLE) return;

      clearTimeouts();
      phaseRef.current = AnimationPhaseEnum.SPINNING;
      setResult(null);
      setHasWon(null);
      setPhase(AnimationPhaseEnum.SPINNING);
      const [betResult] = await Promise.all([
        flipCoin({ currency, betAmount }),
        new Promise<void>((r) => setTimeout(r, SPIN_DURATION)),
      ]);

      invalidateAfterFlip();

      let finalSide: CoinSide;
      if (betResult.isWin) {
        finalSide = choice;
      } else if (choice === CoinSideEnum.HEADS) {
        finalSide = CoinSideEnum.TAILS;
      } else {
        finalSide = CoinSideEnum.HEADS;
      }

      phaseRef.current = AnimationPhaseEnum.RESULT;
      setResult(finalSide);
      setHasWon(betResult.isWin);
      setPhase(AnimationPhaseEnum.RESULT);
      onBetComplete?.(betResult);

      await new Promise<void>((resolve) => {
        const t2 = setTimeout(() => {
          phaseRef.current = AnimationPhaseEnum.IDLE;
          setPhase(AnimationPhaseEnum.IDLE);
          resolve();
        }, RESULT_DISPLAY);
        timeouts.current.push(t2);
      });
    },
    [clearTimeouts, onBetComplete, flipCoin, invalidateAfterFlip],
  );

  useEffect(() => {
    return clearTimeouts;
  }, [clearTimeouts]);

  return { phase, result, hasWon, flip };
}

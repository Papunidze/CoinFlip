import { useCallback, useEffect, useRef, useState } from 'react';
import { useCoinFlip } from '@features/game/hooks/useCoinFlip';
import { useBetForm } from './useBetForm';
import type { BetFormState } from './useBetForm';
import type { CoinSide, History, UserData } from '@shared/types';

export const useBet = (user: UserData | null) => {
  const form = useBetForm();

  const maxAmount = user?.balances[form.currency] ?? 0;
  const cap = maxAmount > 0 ? maxAmount : Infinity;

  const clampedForm: BetFormState = {
    ...form,
    setAmount: (val: number) =>
      form.setAmount(Math.min(Math.max(0.5, +Number(val).toFixed(2)), cap)),
    adjustAmount: (factor: number) =>
      form.setAmount(
        Math.max(0.5, Math.min(+(form.amount * factor).toFixed(2), cap)),
      ),
    addAmount: (step: number) =>
      form.setAmount(
        Math.max(0.5, Math.min(+(form.amount + step).toFixed(2), cap)),
      ),
  };

  const latest = useRef({ form, maxAmount, user });

  useEffect(() => {
    latest.current = { form, maxAmount, user };
  });

  const [isAutoActive, setIsAutoActive] = useState(false);
  const isAutoRunning = useRef(false);
  const sessionProfit = useRef(0);

  const stopAutoBet = useCallback(() => {
    isAutoRunning.current = false;
    sessionProfit.current = 0;
    setIsAutoActive(false);
  }, []);

  const onBetComplete = useCallback(
    (betResult: History) => {
      if (!isAutoRunning.current) return;

      const net = betResult.isWin
        ? betResult.payout - betResult.amount
        : -betResult.amount;
      sessionProfit.current += net;

      const { stopWin = 0, stopLoss = 0 } = latest.current.form;
      if (stopWin > 0 && sessionProfit.current >= stopWin) stopAutoBet();
      else if (stopLoss > 0 && sessionProfit.current <= -stopLoss)
        stopAutoBet();
    },
    [stopAutoBet],
  );

  const { phase, result, hasWon, flip } = useCoinFlip({ onBetComplete });

  const flipRef = useRef(flip);
  useEffect(() => {
    flipRef.current = flip;
  });

  useEffect(() => {
    if (phase !== 'idle') return;
    const { maxAmount: max, form: f, user: u } = latest.current;
    if (u === null) return;
    if (max === 0) f.setAmount(0);
    else if (f.amount > max) f.setAmount(max);
  }, [phase]);

  const runAutoBetLoop = useCallback(
    async (side: CoinSide) => {
      while (isAutoRunning.current) {
        const { amount, currency } = latest.current.form;
        if (latest.current.maxAmount < amount) {
          stopAutoBet();
          break;
        }

        await flipRef.current(side, amount, currency);

        if (!isAutoRunning.current) break;
        await new Promise<void>((r) => setTimeout(r, 300));
      }
    },
    [stopAutoBet],
  );

  const placeBet = useCallback(
    (side: CoinSide) => {
      const { amount, currency, isAuto } = latest.current.form;

      if (isAuto) {
        if (isAutoRunning.current) {
          stopAutoBet();
          return;
        }
        isAutoRunning.current = true;
        sessionProfit.current = 0;
        setIsAutoActive(true);
        runAutoBetLoop(side);
      } else {
        flipRef.current(side, amount, currency);
      }
    },
    [stopAutoBet, runAutoBetLoop],
  );

  return {
    user,
    phase,
    result,
    hasWon,
    placeBet,
    isAutoActive,
    form: clampedForm,
    maxAmount,
  };
};

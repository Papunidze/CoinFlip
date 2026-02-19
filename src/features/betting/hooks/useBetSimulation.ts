import { useCallback, useEffect, useRef, useState } from 'react';
import { useCoinFlip } from '@features/game/hooks/useCoinFlip';
import { useBetForm } from './useBetForm';
import type { BetFormState } from './useBetForm';
import type { CoinSide, History, UserData } from '@shared/types';
import { AnimationPhaseEnum } from '@shared/types/coin';

export const useBetSimulation = (user: UserData | null) => {
  const form = useBetForm();

  const maxAmount = user?.balances[form.currency] ?? 0;
  const cap = maxAmount > 0 ? maxAmount : Infinity;

  const { setAmount: formSetAmount } = form;
  const clampedSetAmount = useCallback(
    (val: number) =>
      formSetAmount(Math.min(Math.max(0.5, +Number(val).toFixed(2)), cap)),
    [formSetAmount, cap],
  );

  const clampedForm: BetFormState = { ...form, setAmount: clampedSetAmount };

  const latest = useRef({ form, maxAmount, user });
  useEffect(() => {
    latest.current = { form, maxAmount, user };
  }, [form, maxAmount, user]);

  const [isAutoActive, setIsAutoActive] = useState(false);
  const [nextBetAmount, setNextBetAmount] = useState<number | null>(null);
  const isAutoRunning = useRef(false);
  const sessionProfit = useRef(0);
  const baseAmountRef = useRef(0);
  const martingaleAmountRef = useRef(0);

  const stopAutoBet = useCallback(() => {
    isAutoRunning.current = false;
    sessionProfit.current = 0;
    baseAmountRef.current = 0;
    martingaleAmountRef.current = 0;
    setIsAutoActive(false);
    setNextBetAmount(null);
  }, []);

  const onBetComplete = useCallback(
    (betResult: History) => {
      if (!isAutoRunning.current) return;

      const net = betResult.isWin
        ? betResult.payout - betResult.amount
        : -betResult.amount;
      sessionProfit.current += net;

      if (latest.current.form.isMartingale) {
        if (betResult.isWin) {
          martingaleAmountRef.current = baseAmountRef.current;
          setNextBetAmount(martingaleAmountRef.current);
          return;
        }
        const doubled = +(martingaleAmountRef.current * 2).toFixed(2);
        if (doubled > latest.current.maxAmount) {
          stopAutoBet();
          return;
        }
        martingaleAmountRef.current = doubled;
        setNextBetAmount(martingaleAmountRef.current);
      }

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
  }, [flip]);

  useEffect(() => {
    if (phase !== AnimationPhaseEnum.IDLE) return;
    const { maxAmount: max, form: f, user: u } = latest.current;
    if (u === null) return;
    if (max === 0) f.setAmount(0);
    else if (f.amount > max) f.setAmount(max);
  }, [phase]);

  const runAutoBetLoop = useCallback(
    async (side: CoinSide) => {
      while (isAutoRunning.current) {
        const { currency, isMartingale } = latest.current.form;
        const betAmount = isMartingale
          ? martingaleAmountRef.current
          : latest.current.form.amount;

        if (
          betAmount <= 0 ||
          latest.current.maxAmount <= 0 ||
          latest.current.maxAmount < betAmount
        ) {
          stopAutoBet();
          break;
        }

        await flipRef.current(side, betAmount, currency);

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
        baseAmountRef.current = amount;
        martingaleAmountRef.current = amount;
        setIsAutoActive(true);
        if (latest.current.form.isMartingale) setNextBetAmount(amount);
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
    nextBetAmount,
    form: clampedForm,
    maxAmount,
  };
};

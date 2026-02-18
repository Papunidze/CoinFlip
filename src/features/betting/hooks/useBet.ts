import { useCallback, useEffect, useRef, useState } from 'react';
import { useAuth } from '@features/auth';
import { useCoinFlip } from '@features/game/hooks/useCoinFlip';
import { useBetForm } from './useBetForm';
import type { BetFormState } from './useBetForm';
import type { CoinSide, BetResult } from '@shared/types';

export const useBet = () => {
  const { user, updateBalance, isPopupOpen, login, openPopup, closePopup } =
    useAuth();

  const form = useBetForm();

  const maxAmount = user?.balances[form.currency] ?? 0;

  const cap = maxAmount > 0 ? maxAmount : Infinity;

  const clampedForm: BetFormState = {
    ...form,
    setAmount: (val: number) =>
      form.setAmount(Math.min(Math.max(1, +Number(val).toFixed(2)), cap)),
    adjustAmount: (factor: number) =>
      form.setAmount(
        Math.max(1, Math.min(+(form.amount * factor).toFixed(2), cap)),
      ),
    addAmount: (step: number) =>
      form.setAmount(
        Math.max(1, Math.min(+(form.amount + step).toFixed(2), cap)),
      ),
  };

  const isAutoRunning = useRef(false);
  const sessionProfit = useRef(0);

  const formRef = useRef(form);
  formRef.current = form;
  const userRef = useRef(user);
  userRef.current = user;
  const maxAmountRef = useRef(maxAmount);
  maxAmountRef.current = maxAmount;
  const updateBalanceRef = useRef(updateBalance);
  updateBalanceRef.current = updateBalance;

  const [isAutoActive, setIsAutoActive] = useState(false);

  const stopAutoBet = useCallback(() => {
    isAutoRunning.current = false;
    sessionProfit.current = 0;
    setIsAutoActive(false);
  }, []);

  const onBetComplete = useCallback(
    (betResult: BetResult) => {
      if (betResult.isWin) {
        updateBalanceRef.current(betResult.payout, betResult.currency);
      }

      if (!isAutoRunning.current) return;

      const net = betResult.isWin
        ? betResult.payout - betResult.amount
        : -betResult.amount;
      sessionProfit.current += net;

      const stopWin = formRef.current.stopWin || 0;
      const stopLoss = formRef.current.stopLoss || 0;

      if (stopWin > 0 && sessionProfit.current >= stopWin) {
        stopAutoBet();
      } else if (stopLoss > 0 && sessionProfit.current <= -stopLoss) {
        stopAutoBet();
      }
    },
    [stopAutoBet],
  );

  const { phase, result, hasWon, flip } = useCoinFlip({ onBetComplete });

  useEffect(() => {
    if (phase === 'idle') {
      const currentMax = maxAmountRef.current;
      if (currentMax > 0 && formRef.current.amount > currentMax) {
        formRef.current.setAmount(currentMax);
      }
    }
  }, [phase]);

  const flipRef = useRef(flip);
  flipRef.current = flip;

  const runAutoBetLoop = useCallback(
    async (side: CoinSide) => {
      while (isAutoRunning.current) {
        const { amount, currency } = formRef.current;
        const balance = userRef.current?.balances[currency] ?? 0;

        if (balance < amount) {
          stopAutoBet();
          break;
        }

        updateBalanceRef.current(-amount, currency);
        await flipRef.current(side, amount, currency);

        if (!isAutoRunning.current) break;

        await new Promise<void>((resolve) => setTimeout(resolve, 300));
      }
    },
    [stopAutoBet],
  );

  const placeBet = useCallback(
    (side: CoinSide) => {
      const { amount, currency, isAuto } = formRef.current;

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
        updateBalanceRef.current(-amount, currency);
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
    isPopupOpen,
    login,
    openPopup,
    closePopup,
  };
};

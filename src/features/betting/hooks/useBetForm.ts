import { useState } from 'react';
import type { Currency } from '@shared/types';

export const useBetForm = () => {
  const [amount, setAmount] = useState(0.5);
  const [currency, setCurrency] = useState<Currency>('BTC');
  const [isAuto, setIsAuto] = useState(false);
  const [stopWin, setStopWin] = useState<number>(0);
  const [stopLoss, setStopLoss] = useState<number>(0);

  return {
    amount,
    setAmount: (val: number) => setAmount(val),
    currency,
    setCurrency,
    isAuto,
    setIsAuto,
    stopWin,
    setStopWin,
    stopLoss,
    setStopLoss,
  };
};

export type BetFormState = ReturnType<typeof useBetForm>;

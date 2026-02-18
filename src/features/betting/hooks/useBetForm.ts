import { useState } from 'react';
import type { Currency } from '@shared/types';

export const useBetForm = () => {
  const [amount, setAmount] = useState(1.0);
  const [currency, setCurrency] = useState<Currency>('BTC');
  const [isAuto, setIsAuto] = useState(false);
  const [stopWin, setStopWin] = useState('');
  const [stopLoss, setStopLoss] = useState('');

  const adjustAmount = (factor: number) =>
    setAmount((prev) => +(prev * factor).toFixed(2));
  const addAmount = (step: number) =>
    setAmount((prev) => Math.max(0.5, +(prev + step).toFixed(2)));

  return {
    amount,
    setAmount,
    currency,
    setCurrency,
    isAuto,
    setIsAuto,
    stopWin,
    setStopWin,
    stopLoss,
    setStopLoss,
    adjustAmount,
    addAmount,
  };
};

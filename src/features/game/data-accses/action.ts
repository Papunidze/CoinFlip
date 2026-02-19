import { useMutation } from '@tanstack/react-query';
import { mockApi } from '@shared/api/mockApi';
import type { Currency } from '@shared/types';

export const useFlipCoin = () => {
  return useMutation({
    mutationFn: ({
      betAmount,
      currency,
    }: {
      betAmount: number;
      currency: Currency;
    }) => mockApi.flipCoin(betAmount, currency),
  });
};

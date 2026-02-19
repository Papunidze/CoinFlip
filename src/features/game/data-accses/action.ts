import { useMutation, useQueryClient } from '@tanstack/react-query';
import { mockApi } from '@shared/api/mockApi';
import type { Currency } from '@shared/types';

export const useFlipCoin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      betAmount,
      currency,
    }: {
      betAmount: number;
      currency: Currency;
    }) => mockApi.flipCoin(betAmount, currency),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['history'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

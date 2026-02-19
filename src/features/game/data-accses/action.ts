import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { mockApi } from '@shared/api/mockApi';
import type { Currency } from '@shared/types';

export const useFlipCoin = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({
      betAmount,
      currency,
    }: {
      betAmount: number;
      currency: Currency;
    }) => mockApi.flipCoin(betAmount, currency),
  });

  const invalidateAfterFlip = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['history'] });
    queryClient.invalidateQueries({ queryKey: ['user'] });
  }, [queryClient]);

  return { ...mutation, invalidateAfterFlip };
};

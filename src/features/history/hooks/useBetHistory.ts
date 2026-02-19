import { useMemo, useState } from 'react';
import { useGetHistory } from '../data-accses/action';

export type FilterType = 'all' | 'win' | 'loss';

export const useBetHistory = () => {
  const { data, isLoading } = useGetHistory();
  const [filterType, setFilterType] = useState<FilterType>('all');

  const bets = useMemo(() => {
    if (!data) return [];
    if (filterType === 'win') return data.filter((bet) => bet.isWin);
    if (filterType === 'loss') return data.filter((bet) => !bet.isWin);
    return data;
  }, [data, filterType]);

  return { bets, isLoading, filterType, setFilterType };
};

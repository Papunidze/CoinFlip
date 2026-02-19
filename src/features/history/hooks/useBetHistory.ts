import { useMemo, useState } from 'react';
import { useGetHistory } from '../data-access/action';

export const FilterTypeEnum = {
  ALL: 'all',
  WIN: 'win',
  LOSS: 'loss',
} as const;

export type FilterType = (typeof FilterTypeEnum)[keyof typeof FilterTypeEnum];

export const useBetHistory = () => {
  const { data, isLoading } = useGetHistory();
  const [filterType, setFilterType] = useState<FilterType>(FilterTypeEnum.ALL);

  const bets = useMemo(() => {
    if (!data) return [];
    if (filterType === FilterTypeEnum.WIN) return data.filter((bet) => bet.isWin);
    if (filterType === FilterTypeEnum.LOSS) return data.filter((bet) => !bet.isWin);
    return data;
  }, [data, filterType]);

  return { bets, isLoading, filterType, setFilterType };
};

import type { BetStats } from '@shared/types';

export const EMPTY_STATS: BetStats = {
  totalBets: 0,
  wins: 0,
  losses: 0,
  biggestWin: 0,
  biggestLoss: 0,
  currentProfit: 0,
} as const;

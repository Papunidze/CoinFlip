export interface BetStats {
  totalBets: number;
  wins: number;
  losses: number;
  biggestWin: number;
  biggestLoss: number;
  currentProfit: number;
}

export const EMPTY_STATS: BetStats = {
  totalBets: 0,
  wins: 0,
  losses: 0,
  biggestWin: 0,
  biggestLoss: 0,
  currentProfit: 0,
} as const;

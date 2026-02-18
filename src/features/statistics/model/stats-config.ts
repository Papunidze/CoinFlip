import type { BetStats } from './statistics';

type ValueVariant = 'win' | 'lose' | 'neutral' | 'dynamic';

export interface StatItem {
  key: keyof BetStats;
  label: string;
  variant: ValueVariant;
  format: 'ratio' | 'currency' | 'number';
}

export const STAT_ITEMS: StatItem[] = [
  { key: 'wins', label: 'Win / Loss', variant: 'dynamic', format: 'ratio' },
  { key: 'biggestWin', label: 'Biggest Win', variant: 'win', format: 'currency' },
  { key: 'biggestLoss', label: 'Biggest Loss', variant: 'lose', format: 'currency' },
  { key: 'currentProfit', label: 'Profit', variant: 'dynamic', format: 'currency' },
  { key: 'totalBets', label: 'Total Bets', variant: 'neutral', format: 'number' },
];

import type { BetStats } from '@shared/types';

export const ValueVariantEnum = {
  WIN: 'win',
  LOSE: 'lose',
  NEUTRAL: 'neutral',
  DYNAMIC: 'dynamic',
} as const;

export const StatFormatEnum = {
  RATIO: 'ratio',
  CURRENCY: 'currency',
  NUMBER: 'number',
} as const;

export const BetResultTypeEnum = {
  WIN: 'win',
  LOSS: 'loss',
} as const;

type ValueVariant = (typeof ValueVariantEnum)[keyof typeof ValueVariantEnum];
export type StatFormat = (typeof StatFormatEnum)[keyof typeof StatFormatEnum];
export type BetResultType = (typeof BetResultTypeEnum)[keyof typeof BetResultTypeEnum];

export interface StatItem {
  key: keyof BetStats;
  label: string;
  variant: ValueVariant;
  format: StatFormat;
}

export const STAT_ITEMS: StatItem[] = [
  { key: 'wins', label: 'Win / Loss', variant: ValueVariantEnum.DYNAMIC, format: StatFormatEnum.RATIO },
  {
    key: 'biggestWin',
    label: 'Biggest Win',
    variant: ValueVariantEnum.WIN,
    format: StatFormatEnum.CURRENCY,
  },
  {
    key: 'biggestLoss',
    label: 'Biggest Loss',
    variant: ValueVariantEnum.LOSE,
    format: StatFormatEnum.CURRENCY,
  },
  {
    key: 'currentProfit',
    label: 'Profit',
    variant: ValueVariantEnum.DYNAMIC,
    format: StatFormatEnum.CURRENCY,
  },
  {
    key: 'totalBets',
    label: 'Total Bets',
    variant: ValueVariantEnum.NEUTRAL,
    format: StatFormatEnum.NUMBER,
  },
];

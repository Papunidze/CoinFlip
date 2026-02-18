export const AnimationPhaseEnum = {
  IDLE: 'idle',
  SPINNING: 'spinning',
  RESULT: 'result',
} as const;

export const CoinSideEnum = {
  HEADS: 'heads',
  TAILS: 'tails',
} as const;

export const CurrencyEnum = {
  BTC: 'BTC',
  ETH: 'ETH',
  SOL: 'SOL',
} as const;

export type AnimationPhase =
  (typeof AnimationPhaseEnum)[keyof typeof AnimationPhaseEnum];

export type CoinSide = (typeof CoinSideEnum)[keyof typeof CoinSideEnum];
export type Currency = (typeof CurrencyEnum)[keyof typeof CurrencyEnum];

export type Balance = Record<Currency, number>;

export interface UserData {
  name: string;
  balances: Balance;
}

export interface BetResult {
  id: string;
  isWin: boolean;
  payout: number;
  amount: number;
  currency: Currency;
  timestamp: string;
}

export type CoinSide = "heads" | "tails";
export type AnimPhase = "idle" | "spinning" | "result";

export type Currency = "BTC" | "ETH" | "SOL";

export interface UserData {
  balances: Record<Currency, number>;
  preferredCurrency: Currency;
}

export interface BetResult {
  id: string;
  isWin: boolean;
  payout: number;
  amount: number;
  currency: Currency;
  timestamp: string;
}

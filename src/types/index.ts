export type Currency = 'BTC' | 'ETH' | 'SOL';

export interface Balances {
  BTC: number;
  ETH: number;
  SOL: number;
}

export interface UserData {
  balances: Balances;
  preferredCurrency: Currency;
}

export interface BetResult {
  id: string;
  amount: number;
  payout: number;
  currency: Currency;
  isWin: boolean;
  timestamp: string;
}

export interface AutoBetSettings {
  isActive: boolean;
  stopWin: number | null;
  stopLoss: number | null;
  baseAmount: number;
}

export interface HistoryFilters {
  searchQuery: string;
  status: 'all' | 'win' | 'loss';
  minAmount?: number;
}

export interface GameStats {
  winLossRatio: number;
  biggestWin: number;
  biggestLoss: number;
  currentProfitLoss: number;
  totalBetsPlaced: number;
}

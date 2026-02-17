import type { UserData, BetResult } from '@app-types';

const STORAGE_KEYS = {
  USER: 'fortunejack_user',
  HISTORY: 'fortunejack_history',
} as const;

const DEFAULT_USER: UserData = {
  balances: { BTC: 1000, ETH: 1000, SOL: 1000 },
  preferredCurrency: 'BTC',
};

export const storage = {
  getUser: (): UserData => {
    const data = localStorage.getItem(STORAGE_KEYS.USER);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(DEFAULT_USER));
      return DEFAULT_USER;
    }
    return JSON.parse(data);
  },

  saveUser: (userData: UserData): void => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
  },

  getHistory: (): BetResult[] => {
    const history = localStorage.getItem(STORAGE_KEYS.HISTORY);
    return history ? JSON.parse(history) : [];
  },

  saveBet: (bet: BetResult): void => {
    const history = storage.getHistory();
    const updatedHistory = [bet, ...history].slice(0, 20);
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updatedHistory));
  },
};

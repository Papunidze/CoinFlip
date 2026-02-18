import type { UserData, BetResult, Currency } from '@shared/types';
import type { Balance } from '@shared/types/coin';

const STORAGE_KEYS = {
  USER: 'user',
  HISTORY: 'history',
} as const;

export const storage = {
  getUser: (): UserData => {
    const data = localStorage.getItem(STORAGE_KEYS.USER)!;
    return JSON.parse(data) as UserData;
  },

  saveUser: (userData: UserData): void => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
  },

  saveBalance: (newBalance: Balance): void => {
    const userData = storage.getUser();

    const updatedUser = {
      ...userData,
      balances: newBalance,
    };
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
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

  updateBalance: (amount: number, currency: Currency): UserData => {
    const user = storage.getUser();

    const updatedBalance: Balance = {
      ...user.balances,
      [currency]: user.balances[currency] + amount,
    };

    storage.saveBalance(updatedBalance);

    return storage.getUser();
  },
};

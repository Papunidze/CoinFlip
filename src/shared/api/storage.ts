import type { UserData, BetResult } from '@shared/types';

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

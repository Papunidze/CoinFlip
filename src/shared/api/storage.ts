import type {
  UserData,
  Currency,
  Balance,
  History,
  BetStats,
} from '@shared/types';

const STORAGE_KEYS = {
  USER: 'user',
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

  getHistory: (): History[] => {
    const history = storage.getUser()?.history;
    return history ?? [];
  },

  saveBet: (bet: History): void => {
    const userData = storage.getUser();
    const updatedHistory = [bet, ...storage.getHistory()].slice(0, 20);
    storage.saveUser({ ...userData, history: updatedHistory });
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

  updateStatistic: (stats: BetStats): void => {
    const userData = storage.getUser();
    storage.saveUser({ ...userData, statistic: stats });
  },
};

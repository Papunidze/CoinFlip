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

const requireUser = (): UserData => {
  const user = storage.getUser();
  if (!user) throw new Error('No user in storage');
  return user;
};

export const storage = {
  getUser: (): UserData | null => {
    const data = localStorage.getItem(STORAGE_KEYS.USER);
    if (!data) return null;
    return JSON.parse(data) as UserData;
  },

  saveUser: (userData: UserData): void => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
  },

  saveBalance: (newBalance: Balance): void => {
    const userData = requireUser();
    storage.saveUser({ ...userData, balances: newBalance });
  },

  getHistory: (): History[] => {
    return storage.getUser()?.history ?? [];
  },

  saveBet: (bet: History): void => {
    const userData = requireUser();
    const updatedHistory = [bet, ...userData.history].slice(0, 20);
    storage.saveUser({ ...userData, history: updatedHistory });
  },

  updateBalance: (amount: number, currency: Currency): UserData => {
    const user = requireUser();
    const updatedBalance: Balance = {
      ...user.balances,
      [currency]: user.balances[currency] + amount,
    };
    storage.saveBalance(updatedBalance);
    return requireUser();
  },

  updateStatistic: (stats: BetStats): void => {
    const userData = requireUser();
    storage.saveUser({ ...userData, statistic: stats });
  },

  clearUser: (): void => {
    localStorage.removeItem(STORAGE_KEYS.USER);
  },
};

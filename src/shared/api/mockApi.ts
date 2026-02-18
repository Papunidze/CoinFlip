import type { UserData, Currency, History } from '@shared/types';
import { storage } from './storage';

export const mockApi = {
  getUserData: async (): Promise<UserData> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(storage.getUser());
      }, 500);
    });
  },

  updateBalance: async (
    currency: Currency,
    newBalance: number,
  ): Promise<void> => {
    const data = storage.getUser();
    data.balances[currency] = newBalance;
    storage.saveUser(data);
  },

  flipCoin: async (
    betAmount: number,
    selectedCrypto: Currency,
  ): Promise<History> => {
    return new Promise((resolve) => {
      const responseTime = Math.floor(Math.random() * 2700) + 300;

      setTimeout(() => {
        const isWin = Math.random() >= 0.5;
        const result: History = {
          isWin,
          payout: isWin ? betAmount * 2 : 0,
          amount: betAmount,
          currency: selectedCrypto,
          timestamp: new Date().toISOString(),
        };

        storage.saveBet(result);
        resolve(result);
      }, responseTime);
    });
  },

  getHistory: async (): Promise<History[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(storage.getHistory());
      }, 400);
    });
  },
};

import type { UserData, Currency, History } from '@shared/types';

import { storage } from './storage';
import { useUuid } from '@shared/hooks/useUuid';

export const mockApi = {
  createUser: async (userData: UserData): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(storage.saveUser(userData));
      }, 500);
    });
  },

  getUserData: async (): Promise<UserData | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(storage.getUser());
      }, 500);
    });
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
          id: useUuid(),
          isWin,
          payout: isWin ? betAmount * 2 : 0,
          amount: betAmount,
          currency: selectedCrypto,
          timestamp: new Date().toISOString(),
        };

        storage.saveBet(result);
        storage.updateBalance(isWin ? betAmount : -betAmount, selectedCrypto);
        mockApi.updateStatistic(result);
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

  updateStatistic: (result: History): void => {
    const user = storage.getUser();
    if (!user) return;

    const { statistic } = user;
    let wins: number;
    let losses: number;
    let biggestWin: number;
    let biggestLoss: number;

    if (result.isWin) {
      wins = statistic.wins + 1;
      losses = statistic.losses;
      biggestWin = Math.max(statistic.biggestWin, result.payout);
      biggestLoss = statistic.biggestLoss;
    } else {
      wins = statistic.wins;
      losses = statistic.losses + 1;
      biggestWin = statistic.biggestWin;
      biggestLoss = Math.max(statistic.biggestLoss, result.amount);
    }

    const newStats = {
      totalBets: statistic.totalBets + 1,
      wins,
      losses,
      biggestWin,
      biggestLoss,
      currentProfit: statistic.currentProfit + (result.payout - result.amount),
    };

    storage.updateStatistic(newStats);
  },
};

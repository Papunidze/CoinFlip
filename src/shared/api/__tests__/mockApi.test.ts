import { mockApi } from '../mockApi';
import { storage } from '../storage';
import type { UserData } from '../../types/index';

jest.mock('uuid', () => ({ v4: () => 'test-uuid' }));

jest.useFakeTimers();

const makeUser = (): UserData => ({
  name: 'Tester',
  balances: { BTC: 1000, ETH: 1000, SOL: 1000 },
  history: [],
  statistic: {
    totalBets: 0,
    wins: 0,
    losses: 0,
    biggestWin: 0,
    biggestLoss: 0,
    currentProfit: 0,
  },
});

beforeEach(() => {
  localStorage.clear();
  storage.saveUser(makeUser());
});

describe('mockApi.flipCoin', () => {
  it('returns a win result when Math.random >= 0.5', async () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
    const promise = mockApi.flipCoin(10, 'BTC');
    jest.runAllTimers();
    const result = await promise;

    expect(result.isWin).toBe(true);
    expect(result.payout).toBe(20);
    expect(result.amount).toBe(10);
    expect(result.currency).toBe('BTC');
    expect(result.id).toBeDefined();
    expect(result.timestamp).toBeDefined();
  });

  it('returns a loss result when Math.random < 0.5', async () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.49);
    const promise = mockApi.flipCoin(10, 'ETH');
    jest.runAllTimers();
    const result = await promise;

    expect(result.isWin).toBe(false);
    expect(result.payout).toBe(0);
    expect(result.amount).toBe(10);
    expect(result.currency).toBe('ETH');
  });

  it('updates the user balance after a win', async () => {
    jest.spyOn(Math, 'random').mockReturnValue(1);
    const promise = mockApi.flipCoin(100, 'BTC');
    jest.runAllTimers();
    await promise;

    expect(storage.getUser()!.balances.BTC).toBe(1100);
  });

  it('updates the user balance after a loss', async () => {
    jest.spyOn(Math, 'random').mockReturnValue(0);
    const promise = mockApi.flipCoin(100, 'BTC');
    jest.runAllTimers();
    await promise;

    expect(storage.getUser()!.balances.BTC).toBe(900);
  });
});

describe('mockApi.updateStatistic', () => {
  it('increments totalBets and wins on a win', () => {
    const winBet = {
      id: '1',
      isWin: true,
      payout: 20,
      amount: 10,
      currency: 'BTC' as const,
      timestamp: '',
    };
    mockApi.updateStatistic(winBet);
    const { statistic } = storage.getUser()!;

    expect(statistic.totalBets).toBe(1);
    expect(statistic.wins).toBe(1);
    expect(statistic.losses).toBe(0);
    expect(statistic.biggestWin).toBe(20);
    expect(statistic.currentProfit).toBe(10);
  });

  it('increments totalBets and losses on a loss', () => {
    const lossBet = {
      id: '2',
      isWin: false,
      payout: 0,
      amount: 10,
      currency: 'SOL' as const,
      timestamp: '',
    };
    mockApi.updateStatistic(lossBet);
    const { statistic } = storage.getUser()!;

    expect(statistic.totalBets).toBe(1);
    expect(statistic.wins).toBe(0);
    expect(statistic.losses).toBe(1);
    expect(statistic.biggestLoss).toBe(10);
    expect(statistic.currentProfit).toBe(-10);
  });

  it('tracks the biggest win correctly across multiple bets', () => {
    const bet = (payout: number) => ({
      id: '1',
      isWin: true,
      payout,
      amount: payout / 2,
      currency: 'BTC' as const,
      timestamp: '',
    });

    mockApi.updateStatistic(bet(50));
    mockApi.updateStatistic(bet(200));
    mockApi.updateStatistic(bet(100));

    expect(storage.getUser()!.statistic.biggestWin).toBe(200);
  });

  it('does nothing when no user is in storage', () => {
    storage.clearUser();
    expect(() =>
      mockApi.updateStatistic({
        id: '1',
        isWin: true,
        payout: 10,
        amount: 5,
        currency: 'BTC',
        timestamp: '',
      }),
    ).not.toThrow();
  });
});

describe('mockApi.getUserData', () => {
  it('resolves with null when no user exists', async () => {
    storage.clearUser();
    const promise = mockApi.getUserData();
    jest.runAllTimers();
    await expect(promise).resolves.toBeNull();
  });

  it('resolves with the saved user', async () => {
    const promise = mockApi.getUserData();
    jest.runAllTimers();
    const result = await promise;
    expect(result?.name).toBe('Tester');
  });
});

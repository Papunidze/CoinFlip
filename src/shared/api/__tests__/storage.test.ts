import { storage } from '../storage';
import type { UserData } from '../../types/index';

const makeUser = (overrides: Partial<UserData> = {}): UserData => ({
  name: 'TestUser',
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
  ...overrides,
});

const makeBet = (overrides = {}) => ({
  id: 'test-id',
  isWin: true,
  payout: 10,
  amount: 5,
  currency: 'BTC' as const,
  timestamp: new Date().toISOString(),
  ...overrides,
});

beforeEach(() => {
  localStorage.clear();
});

describe('storage.getUser', () => {
  it('returns null when localStorage is empty', () => {
    expect(storage.getUser()).toBeNull();
  });

  it('returns parsed user when data exists', () => {
    const user = makeUser();
    storage.saveUser(user);
    expect(storage.getUser()).toEqual(user);
  });
});

describe('storage.saveUser', () => {
  it('persists user to localStorage', () => {
    const user = makeUser({ name: 'Alice' });
    storage.saveUser(user);
    const raw = localStorage.getItem('user');
    expect(JSON.parse(raw!).name).toBe('Alice');
  });
});

describe('storage.getHistory', () => {
  it('returns empty array when no user exists', () => {
    expect(storage.getHistory()).toEqual([]);
  });

  it('returns history from saved user', () => {
    const bet = makeBet();
    storage.saveUser(makeUser({ history: [bet] }));
    expect(storage.getHistory()).toEqual([bet]);
  });
});

describe('storage.saveBet', () => {
  it('prepends new bet to history', () => {
    storage.saveUser(makeUser());
    const bet = makeBet();
    storage.saveBet(bet);
    expect(storage.getHistory()[0]).toEqual(bet);
  });

  it('keeps only the last 20 bets', () => {
    const history = Array.from({ length: 20 }, (_, i) =>
      makeBet({ id: `old-${i}`, timestamp: String(i) }),
    );
    storage.saveUser(makeUser({ history }));

    const newBet = makeBet({ id: 'newest' });
    storage.saveBet(newBet);

    const saved = storage.getHistory();
    expect(saved).toHaveLength(20);
    expect(saved[0].id).toBe('newest');
    // old-19 (the oldest) gets pushed out; old-0 through old-18 remain
    expect(saved.find((b) => b.id === 'old-19')).toBeUndefined();
    expect(saved.find((b) => b.id === 'old-0')).toBeDefined();
  });
});

describe('storage.updateBalance', () => {
  it('adds a positive delta to the currency balance', () => {
    storage.saveUser(
      makeUser({ balances: { BTC: 100, ETH: 1000, SOL: 1000 } }),
    );
    const updated = storage.updateBalance(50, 'BTC');
    expect(updated.balances.BTC).toBe(150);
  });

  it('subtracts a negative delta from the currency balance', () => {
    storage.saveUser(
      makeUser({ balances: { BTC: 100, ETH: 1000, SOL: 1000 } }),
    );
    const updated = storage.updateBalance(-30, 'BTC');
    expect(updated.balances.BTC).toBe(70);
  });

  it('throws when no user exists', () => {
    expect(() => storage.updateBalance(10, 'BTC')).toThrow(
      'No user in storage',
    );
  });
});

describe('storage.clearUser', () => {
  it('removes the user from localStorage', () => {
    storage.saveUser(makeUser());
    storage.clearUser();
    expect(storage.getUser()).toBeNull();
  });
});

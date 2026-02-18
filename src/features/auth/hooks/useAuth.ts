import { useState, useCallback } from 'react';
import { type UserData, type Currency, type Balance } from '@shared/types';
import { storage } from '@api/storage';
import { CurrencyEnum } from '@shared/types/coin';

const defaultBalanceAmount = 1000;

const defaultBalance = Object.values(CurrencyEnum).reduce<Balance>(
  (acc, currency) => ({ ...acc, [currency]: defaultBalanceAmount }),
  {} as Balance,
);

export const useAuth = () => {
  const [user, setUser] = useState<UserData | null>(() => storage.getUser());

  const [isPopupOpen, setIsPopupOpen] = useState(user === null);

  const login = useCallback((name: string) => {
    const trimmed = name.trim();
    if (trimmed) {
      const newUser = { name: trimmed, balances: defaultBalance, history: [] };
      storage.saveUser(newUser);
      setUser(newUser);
    }
    setIsPopupOpen(false);
  }, []);

  const openPopup = useCallback(() => setIsPopupOpen(true), []);
  const closePopup = useCallback(() => setIsPopupOpen(false), []);

  const updateBalance = useCallback((amount: number, currency: Currency) => {
    const updatedUser = storage.updateBalance(amount, currency);
    setUser(updatedUser);
  }, []);

  return { user, isPopupOpen, login, openPopup, closePopup, updateBalance };
};

import { useState, useCallback } from 'react';
import { type Balance } from '@shared/types';
import { storage } from '@api/storage';
import { CurrencyEnum } from '@shared/types/coin';
import { useCreateUser, useGetUser } from '@features/auth/data-accses/action';

const defaultBalanceAmount = 1000;

const defaultBalance = Object.values(CurrencyEnum).reduce<Balance>(
  (acc, currency) => ({ ...acc, [currency]: defaultBalanceAmount }),
  {} as Balance,
);

export const useAuth = () => {
  const { data: user = null } = useGetUser();
  const { mutate: createUser, isPending } = useCreateUser();

  const [isPopupOpen, setIsPopupOpen] = useState(!storage.getUser());

  const login = useCallback(
    (name: string) => {
      const trimmed = name.trim();
      if (trimmed) {
        createUser(
          {
            userData: { name: trimmed, balances: defaultBalance, history: [] },
          },
          { onSuccess: () => setIsPopupOpen(false) },
        );
      }
    },
    [createUser],
  );

  const openPopup = useCallback(() => setIsPopupOpen(true), []);
  const closePopup = useCallback(() => setIsPopupOpen(false), []);

  return { user, isPopupOpen, login, isPending, openPopup, closePopup };
};

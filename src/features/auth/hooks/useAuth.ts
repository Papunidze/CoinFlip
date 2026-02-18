import { useState, useCallback } from 'react';
import type { AuthUser } from '../model/auth';
import { GUEST_USER } from '../model/auth';

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser>(GUEST_USER);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const login = useCallback((name: string) => {
    const trimmed = name.trim();
    if (trimmed) {
      setUser({ name: trimmed });
    }
    setIsPopupOpen(false);
  }, []);

  const openPopup = useCallback(() => setIsPopupOpen(true), []);
  const closePopup = useCallback(() => setIsPopupOpen(false), []);

  return { user, isPopupOpen, login, openPopup, closePopup };
};

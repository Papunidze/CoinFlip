import { useState, useRef, useEffect } from 'react';
import { useScrollLock } from '@shared/hooks/useScrollLock';
import './_auth-module.scss';

interface AuthPopupProps {
  isAuth: boolean;
  userName?: string;
  onSubmit: (name: string) => void;
  onClose: () => void;
  onLogout: () => void;
  isLoading: boolean;
}

const AuthPopup = ({
  onSubmit,
  onClose,
  onLogout,
  isAuth,
  userName,
  isLoading,
}: AuthPopupProps) => {
  const [name, setName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useScrollLock(true);

  useEffect(() => {
    if (!isAuth) inputRef.current?.focus();
  }, [isAuth]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(name);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="auth-overlay" onClick={handleOverlayClick}>
      <div className="auth-popup">
        <div className="auth-popup__header">
          <span className="auth-popup__title">{isAuth ? 'Profile' : 'Auth'}</span>
          <button
            type="button"
            className="auth-popup__close"
            onClick={onClose}
            disabled={!isAuth}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {isAuth ? (
          <div className="auth-popup__body">
            <div className="auth-popup__profile-name">{userName}</div>
            <button
              type="button"
              className="auth-popup__logout"
              onClick={onLogout}
            >
              Log out
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="auth-popup__body">
              <div className="auth-popup__field">
                <label className="auth-popup__label">Username</label>
                <input
                  ref={inputRef}
                  className="auth-popup__input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name..."
                  maxLength={20}
                  aria-label="Username"
                />
              </div>
              <button
                type="submit"
                className="auth-popup__submit"
                disabled={!name.trim() || isLoading}
              >
                {isLoading ? 'Loading...' : 'Confirm'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthPopup;

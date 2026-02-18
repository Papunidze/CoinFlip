import { useState, useRef, useEffect } from 'react';
import './_auth-module.scss';

interface AuthPopupProps {
  currentName: string;
  onSubmit: (name: string) => void;
  onClose: () => void;
}

const AuthPopup = ({ currentName, onSubmit, onClose }: AuthPopupProps) => {
  const [name, setName] = useState(currentName === 'Guest' ? '' : currentName);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(name);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="auth-overlay" onClick={handleOverlayClick}>
      <form className="auth-popup" onSubmit={handleSubmit}>
        <div className="auth-popup__header">
          <span className="auth-popup__title">Auth</span>
          <button type="button" className="auth-popup__close" onClick={onClose}>
            ✕
          </button>
        </div>
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
            />
          </div>
          <button
            type="submit"
            className="auth-popup__submit"
            disabled={!name.trim()}
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthPopup;

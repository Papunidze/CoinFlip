import { useState } from 'react';
import { createPortal } from 'react-dom';
import type { Currency, UserData } from '@shared/types';
import { CurrencyEnum } from '@shared/types/coin';
import { useScrollLock } from '@shared/hooks/useScrollLock';

const CURRENCIES = Object.values(CurrencyEnum);

interface UserInfoProps {
  user: UserData;
  onProfileClick: () => void;
  selectedCurrency: Currency;
  onCurrencyChange: (c: Currency) => void;
}

export const UserInfo = ({
  user,
  onProfileClick,
  selectedCurrency,
  onCurrencyChange,
}: UserInfoProps) => {
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);

  useScrollLock(isCurrencyOpen);

  return (
    <div className="topbar__user">
      <div className="topbar__balances">
        {Object.entries(user.balances).map(([currency, amount]) => (
          <div
            key={currency}
            className="topbar__balance topbar__balance--desktop"
          >
            <img
              src={`/icons/${currency.toLowerCase()}.svg`}
              alt={currency}
              className="topbar__balance-icon"
            />
            <span className="topbar__balance-value">
              {(amount as number).toFixed(2)}
            </span>
          </div>
        ))}

        <button
          type="button"
          className="topbar__balance topbar__balance--mobile"
          onClick={() => setIsCurrencyOpen(true)}
        >
          <img
            src={`/icons/${selectedCurrency.toLowerCase()}.svg`}
            alt={selectedCurrency}
            className="topbar__balance-icon"
          />
          <span className="topbar__balance-value">
            {user.balances[selectedCurrency].toFixed(2)}
          </span>
          <span className="topbar__balance-chevron">▾</span>
        </button>
      </div>

      <button className="topbar__profile" onClick={onProfileClick}>
        <img src="/icons/user.svg" alt="User" className="topbar__user-icon" />
        <span className="topbar__username">{user.name}</span>
      </button>

      {isCurrencyOpen &&
        createPortal(
          <div
            className="topbar__currency-overlay"
            onClick={() => setIsCurrencyOpen(false)}
          >
            <div
              className="topbar__currency-popup"
              onClick={(e) => e.stopPropagation()}
            >
              {CURRENCIES.map((currency) => (
                <button
                  key={currency}
                  type="button"
                  className={`topbar__currency-option${selectedCurrency === currency ? ' topbar__currency-option--active' : ''}`}
                  onClick={() => {
                    onCurrencyChange(currency);
                    setIsCurrencyOpen(false);
                  }}
                >
                  <img
                    src={`/icons/${currency.toLowerCase()}.svg`}
                    alt={currency}
                    className="topbar__balance-icon"
                  />
                  <span className="topbar__currency-option-name">
                    {currency}
                  </span>
                  <span className="topbar__currency-option-amount">
                    {user.balances[currency].toFixed(2)}
                  </span>
                </button>
              ))}
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
};

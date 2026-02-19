import type { Currency } from '@shared/types';
import { CurrencyEnum } from '@shared/types/coin';

const CURRENCIES = Object.values(CurrencyEnum);

interface Props {
  selected: Currency;
  onChange: (c: Currency) => void;
  disabled: boolean;
}

export const CurrencyTabs = ({ selected, onChange, disabled }: Props) => (
  <div className="bet-controller__currency-selector">
    {CURRENCIES.map((currency) => (
      <button
        key={currency}
        className={`bet-controller__currency-btn ${selected === currency ? 'bet-controller__currency-btn--active' : ''}`}
        onClick={() => onChange(currency)}
        disabled={disabled}
      >
        <img
          className="bet-controller__currency-icon"
          src={`/icons/${currency.toLowerCase()}.svg`}
          alt={currency}
        />
        {currency}
      </button>
    ))}
  </div>
);

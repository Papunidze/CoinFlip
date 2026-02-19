import { useState } from 'react';
import {
  BET_ACTIONS,
  QUICK_BETS,
  STEP_BUTTONS,
  type AmountAction,
} from '../model/amount-controls';

interface Props {
  amount: number;
  maxAmount: number;
  onSet: (val: number) => void;
  disabled: boolean;
  nextBetAmount?: number | null;
}

export const AmountControls = ({
  amount,
  maxAmount,
  onSet,
  disabled,
  nextBetAmount,
}: Props) => {
  const [editValue, setEditValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const inputValue = isEditing
    ? editValue
    : amount > 0
      ? amount.toFixed(2)
      : '';

  const handleClick = (action: AmountAction) => {
    if (action.label === 'MAX') {
      onSet(maxAmount);
      return;
    }
    if (action.label === 'MAX') {
      onSet(maxAmount);
      return;
    }

    switch (action.type) {
      case 'set':
        onSet(Math.min(action.value, maxAmount));
        break;
      case 'adjust':
        onSet(Math.min(amount * action.value, maxAmount));
        break;
      case 'add':
        onSet(Math.min(amount + action.value, maxAmount));
        break;
    }
  };

  return (
    <div className="bet-controller__controls">
      <div className="bet-controller__row">
        <span className="bet-controller__label">Bet</span>
        {nextBetAmount != null && (
          <span className="bet-controller__next-bet">
            Next: {nextBetAmount.toFixed(2)}
          </span>
        )}
        <div className="bet-controller__amount-input">
          <button
            className="bet-controller__adjust-btn"
            onClick={() => handleClick(STEP_BUTTONS[0])}
            disabled={disabled}
            aria-label="Decrease bet amount"
          >
            {STEP_BUTTONS[0].label}
          </button>
          <input
            className="bet-controller__input"
            type="number"
            value={inputValue}
            aria-label="Bet amount"
            onFocus={(e) => {
              setIsEditing(true);
              setEditValue(amount > 0 ? amount.toFixed(2) : '');
              e.target.select();
            }}
            onKeyDown={(e) => {
              if (['-', '+', 'e', 'E', ','].includes(e.key)) e.preventDefault();
            }}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={() => {
              setIsEditing(false);
              const num = parseFloat(editValue);
              if (!isNaN(num) && num > 0) {
                onSet(Math.min(num, maxAmount));
              }
            }}
            disabled={disabled}
          />
          <button
            className="bet-controller__adjust-btn"
            onClick={() => handleClick(STEP_BUTTONS[1])}
            disabled={disabled}
            aria-label="Increase bet amount"
          >
            {STEP_BUTTONS[1].label}
          </button>
        </div>
      </div>
      <div className="bet-controller__quick-actions">
        <div className="bet-controller__quick-bets">
          {QUICK_BETS.map((action) => (
            <button
              className="bet-controller__quick-btn"
              key={action.label}
              onClick={() => handleClick(action)}
              disabled={disabled}
            >
              {action.label}
            </button>
          ))}
        </div>
        <div className="bet-controller__bet-actions">
          {BET_ACTIONS.map((action) => (
            <button
              className={`bet-controller__action-btn${action.modifier ? ` bet-controller__action-btn--${action.modifier}` : ''}`}
              key={action.label}
              onClick={() => handleClick(action)}
              disabled={disabled}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

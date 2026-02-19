import { useState, useEffect } from 'react';
import {
  BET_ACTIONS,
  QUICK_BETS,
  STEP_BUTTONS,
  type ActionType,
  type AmountAction,
} from '../model/amount-controls';

interface Props {
  amount: number;
  maxAmount: number;
  onAdjust: (factor: number) => void;
  onAdd: (step: number) => void;
  onSet: (val: number) => void;
  disabled: boolean;
}

const handlers: Record<
  ActionType,
  keyof Pick<Props, 'onSet' | 'onAdjust' | 'onAdd'>
> = {
  set: 'onSet',
  adjust: 'onAdjust',
  add: 'onAdd',
};

export const AmountControls = ({
  amount,
  maxAmount,
  onAdjust,
  onAdd,
  onSet,
  disabled,
}: Props) => {
  const [inputValue, setInputValue] = useState(
    amount > 0 ? amount.toFixed(2) : '',
  );

  useEffect(() => {
    setInputValue(amount > 0 ? amount.toFixed(2) : '');
  }, [amount]);

  const actions = { onSet, onAdjust, onAdd };

  const handleClick = (action: AmountAction) => {
    if (action.label === 'MAX') {
      onSet(maxAmount);
      return;
    }
    actions[handlers[action.type]](action.value);
  };

  return (
    <div className="bet-controller__controls">
      <div className="bet-controller__row">
        <span className="bet-controller__label">Bet</span>
        <div className="bet-controller__amount-input">
          <button
            className="bet-controller__adjust-btn"
            onClick={() => handleClick(STEP_BUTTONS[0])}
            disabled={disabled}
          >
            {STEP_BUTTONS[0].label}
          </button>
          <input
            className="bet-controller__input"
            type="number"
            value={inputValue}
            onFocus={(e) => e.target.select()}
            onKeyDown={(e) => {
              if (['-', '+', 'e', 'E', ','].includes(e.key)) e.preventDefault();
            }}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={() => {
              const num = parseFloat(inputValue);
              if (!isNaN(num) && num > 0) {
                onSet(num);
              } else {
                setInputValue(amount > 0 ? amount.toFixed(2) : '');
              }
            }}
            disabled={disabled}
          />
          <button
            className="bet-controller__adjust-btn"
            onClick={() => handleClick(STEP_BUTTONS[1])}
            disabled={disabled}
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

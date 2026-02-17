import { useState } from 'react';
import './_betting-module.scss';
import type { CoinSide } from '@shared/types';

interface BetControllerProps {
  onBet: (side: CoinSide, amount: number) => void;
  disabled: boolean;
  onSideChange?: (side: CoinSide) => void;
}

const CURRENCIES = ['BTC', 'ETH', 'SOL'] as const;
const QUICK_BETS = [5.0, 25.0, 100.0];
const STEP = 0.5;
const MIN_BET = 0.5;

const BetController = ({
  onBet,
  disabled,
  onSideChange,
}: BetControllerProps) => {
  const [selectedSide, setSelectedSide] = useState<CoinSide>('heads');
  const [betAmount, setBetAmount] = useState(1.0);
  const [selectedCurrency, setSelectedCurrency] =
    useState<(typeof CURRENCIES)[number]>('BTC');
  const [autoBetEnabled, setAutoBetEnabled] = useState(false);
  const [stopWin, setStopWin] = useState('');
  const [stopLoss, setStopLoss] = useState('');

  return (
    <div className="bet-controller">
      <div className="bet-controller__side-switch">
        <button
          className={`bet-controller__side-btn ${selectedSide === 'heads' ? 'bet-controller__side-btn--active' : ''}`}
          onClick={() => {
            setSelectedSide('heads');
            onSideChange?.('heads');
          }}
          disabled={disabled}
        >
          HEAD
        </button>
        <button
          className={`bet-controller__side-btn ${selectedSide === 'tails' ? 'bet-controller__side-btn--active' : ''}`}
          onClick={() => {
            setSelectedSide('tails');
            onSideChange?.('tails');
          }}
          disabled={disabled}
        >
          TAIL
        </button>
      </div>

      <div className="bet-controller__panel">
        <div className="bet-controller__controls">
          <div className="bet-controller__currency-selector">
            {CURRENCIES.map((currency) => (
              <button
                key={currency}
                className={`bet-controller__currency-btn ${selectedCurrency === currency ? 'bet-controller__currency-btn--active' : ''}`}
                onClick={() => setSelectedCurrency(currency)}
                disabled={disabled}
              >
                <img
                  src={`/icons/${currency.toLowerCase()}.svg`}
                  alt={currency}
                  className="bet-controller__currency-icon"
                />
                {currency}
              </button>
            ))}
          </div>

          <div className="bet-controller__row">
            <span className="bet-controller__label">Bet</span>
            <div className="bet-controller__amount-input">
              <button
                className="bet-controller__adjust-btn"
                onClick={() =>
                  setBetAmount((prev) =>
                    Math.max(MIN_BET, +(prev - STEP).toFixed(2)),
                  )
                }
                disabled={disabled || betAmount <= MIN_BET}
              >
                −
              </button>
              <input
                type="text"
                className="bet-controller__input"
                value={betAmount.toFixed(2)}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  if (!isNaN(val) && val >= MIN_BET) setBetAmount(val);
                }}
                disabled={disabled}
              />
              <button
                className="bet-controller__adjust-btn"
                onClick={() =>
                  setBetAmount((prev) => +(prev + STEP).toFixed(2))
                }
                disabled={disabled}
              >
                +
              </button>
            </div>
          </div>

          <div className="bet-controller__quick-actions">
            <div className="bet-controller__quick-bets">
              {QUICK_BETS.map((amount) => (
                <button
                  key={amount}
                  className="bet-controller__quick-btn"
                  onClick={() => setBetAmount(amount)}
                  disabled={disabled}
                >
                  {amount.toFixed(2)}
                </button>
              ))}
            </div>
            <div className="bet-controller__bet-actions">
              <button
                className="bet-controller__action-btn bet-controller__action-btn--double"
                onClick={() => setBetAmount((prev) => +(prev * 2).toFixed(2))}
                disabled={disabled}
              >
                x2
              </button>
              <button
                className="bet-controller__action-btn bet-controller__action-btn--remove"
                onClick={() =>
                  setBetAmount((prev) =>
                    Math.max(MIN_BET, +(prev / 2).toFixed(2)),
                  )
                }
                disabled={disabled}
              >
                ½
              </button>
              <button
                className="bet-controller__action-btn"
                onClick={() => setBetAmount(1000)}
                disabled={disabled}
              >
                MAX
              </button>
            </div>
          </div>

          <div className="bet-controller__auto-section">
            <div className="bet-controller__auto-header">
              <span className="bet-controller__label">AUTO Bet</span>
              <button
                className={`bet-controller__toggle ${autoBetEnabled ? 'bet-controller__toggle--active' : ''}`}
                onClick={() => setAutoBetEnabled((prev) => !prev)}
                disabled={disabled}
              >
                <span className="bet-controller__toggle-thumb" />
              </button>
            </div>

            {autoBetEnabled && (
              <div className="bet-controller__stop-row">
                <div className="bet-controller__stop-field">
                  <span className="bet-controller__stop-label">Stop Win</span>
                  <input
                    type="text"
                    className="bet-controller__stop-input"
                    placeholder="0.00"
                    value={stopWin}
                    onChange={(e) => setStopWin(e.target.value)}
                    disabled={disabled}
                  />
                </div>
                <div className="bet-controller__stop-field">
                  <span className="bet-controller__stop-label">Stop Loss</span>
                  <input
                    type="text"
                    className="bet-controller__stop-input"
                    placeholder="0.00"
                    value={stopLoss}
                    onChange={(e) => setStopLoss(e.target.value)}
                    disabled={disabled}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <button
        className="bet-controller__place-bet"
        onClick={() => onBet(selectedSide, betAmount)}
        disabled={disabled}
      >
        <span className="bet-controller__bet-amount">
          {betAmount.toFixed(2)}
        </span>
        <span className="bet-controller__bet-label">Bet</span>
      </button>
    </div>
  );
};

export default BetController;

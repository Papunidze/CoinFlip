import { useState, type KeyboardEvent } from 'react';

const blockInvalidKeys = (e: KeyboardEvent<HTMLInputElement>) => {
  if (['e', 'E', '-', '+'].includes(e.key)) e.preventDefault();
};

interface Props {
  isEnabled: boolean;
  onToggle: (val: boolean) => void;
  stopWin: number;
  onStopWinChange: (val: number) => void;
  stopLoss: number;
  onStopLossChange: (val: number) => void;
  disabled: boolean;
  isMartingale: boolean;
  onMartingale: (val: boolean) => void;
}

export const AutoBetConfig = ({
  isEnabled,
  onToggle,
  stopWin,
  onStopWinChange,
  stopLoss,
  onStopLossChange,
  disabled,
  onMartingale,
  isMartingale,
}: Props) => {
  const [stopWinStr, setStopWinStr] = useState(
    stopWin > 0 ? String(stopWin) : '',
  );
  const [stopLossStr, setStopLossStr] = useState(
    stopLoss > 0 ? String(stopLoss) : '',
  );

  return (
    <div className="bet-controller__auto-section">
      <div className="bet-controller__auto-header">
        <span className="bet-controller__label">AUTO Bet</span>
        <button
          className={`bet-controller__toggle ${isEnabled ? 'bet-controller__toggle--active' : ''}`}
          onClick={() => onToggle(!isEnabled)}
          disabled={disabled}
          role="switch"
          aria-checked={isEnabled}
          aria-label="Toggle auto bet"
        >
          <span className="bet-controller__toggle-thumb" />
        </button>
      </div>

      {isEnabled && (
        <>
          <div className="bet-controller__auto-header">
            <span className="bet-controller__label">Martingale</span>
            <button
              className={`bet-controller__toggle ${isMartingale ? 'bet-controller__toggle--active' : ''}`}
              onClick={() => onMartingale(!isMartingale)}
              disabled={disabled}
              role="switch"
              aria-checked={isEnabled}
              aria-label="Toggle auto bet"
            >
              <span className="bet-controller__toggle-thumb" />
            </button>
          </div>
          <div className="bet-controller__stop-row">
            <div className="bet-controller__stop-field">
              <span className="bet-controller__stop-label">Stop Win</span>
              <input
                className="bet-controller__stop-input"
                type="number"
                min="0"
                step="0.01"
                value={stopWinStr}
                onKeyDown={blockInvalidKeys}
                onChange={(e) => {
                  setStopWinStr(e.target.value);
                  onStopWinChange(
                    e.target.value === '' ? 0 : Number(e.target.value),
                  );
                }}
                disabled={disabled}
                placeholder="0.00"
              />
            </div>
            <div className="bet-controller__stop-field">
              <span className="bet-controller__stop-label">Stop Loss</span>
              <input
                className="bet-controller__stop-input"
                type="number"
                min="0"
                step="0.01"
                value={stopLossStr}
                onKeyDown={blockInvalidKeys}
                onChange={(e) => {
                  setStopLossStr(e.target.value);
                  onStopLossChange(
                    e.target.value === '' ? 0 : Number(e.target.value),
                  );
                }}
                disabled={disabled}
                placeholder="0.00"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

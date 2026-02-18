interface Props {
  isEnabled: boolean;
  onToggle: (val: boolean) => void;
  stopWin: string;
  onStopWinChange: (val: string) => void;
  stopLoss: string;
  onStopLossChange: (val: string) => void;
  disabled: boolean;
}

export const AutoBetConfig = ({
  isEnabled,
  onToggle,
  stopWin,
  onStopWinChange,
  stopLoss,
  onStopLossChange,
  disabled,
}: Props) => (
  <div className="bet-controller__auto-section">
    <div className="bet-controller__auto-header">
      <span className="bet-controller__label">AUTO Bet</span>
      <button
        className={`bet-controller__toggle ${isEnabled ? 'bet-controller__toggle--active' : ''}`}
        onClick={() => onToggle(!isEnabled)}
        disabled={disabled}
      >
        <span className="bet-controller__toggle-thumb" />
      </button>
    </div>
    {isEnabled && (
      <div className="bet-controller__stop-row">
        <div className="bet-controller__stop-field">
          <span className="bet-controller__stop-label">Stop Win</span>
          <input
            className="bet-controller__stop-input"
            type="text"
            value={stopWin}
            onChange={(e) => onStopWinChange(e.target.value)}
            disabled={disabled}
            placeholder="0.00"
          />
        </div>
        <div className="bet-controller__stop-field">
          <span className="bet-controller__stop-label">Stop Loss</span>
          <input
            className="bet-controller__stop-input"
            type="text"
            value={stopLoss}
            onChange={(e) => onStopLossChange(e.target.value)}
            disabled={disabled}
            placeholder="0.00"
          />
        </div>
      </div>
    )}
  </div>
);

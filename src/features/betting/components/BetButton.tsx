import type { Currency } from '@shared/types';

interface BetButtonProps {
  onBet: () => void;
  amount: number;
  disabled: boolean;
  currency: Currency;
  isAuto: boolean;
  isAutoActive: boolean;
  maxAmount: number;
}

const BetButton = ({
  onBet,
  amount,
  disabled,
  currency,
  isAuto,
  isAutoActive,
  maxAmount,
}: BetButtonProps) => {
  const isStopMode = isAuto && isAutoActive;
  const insufficientBalance = maxAmount <= 0 || amount > maxAmount;

  return (
    <button
      className={`bet-controller__place-bet${isStopMode ? ' bet-controller__place-bet--stop' : ''}`}
      onClick={onBet}
      disabled={!isStopMode && (disabled || insufficientBalance)}
    >
      {isStopMode ? (
        <span className="bet-controller__bet-label">Stop</span>
      ) : (
        <>
          <span className="bet-controller__bet-amount">
            {amount}
            {currency}
          </span>
          <span className="bet-controller__bet-label">
            {isAuto ? 'Auto Bet' : 'Bet'}
          </span>
        </>
      )}
    </button>
  );
};

export default BetButton;

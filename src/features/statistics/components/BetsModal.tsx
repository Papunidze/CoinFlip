import { useMemo } from 'react';
import { useGetHistory } from '@features/history/data-access/action';
import type { History } from '@shared/types';
import { useScrollLock } from '@shared/hooks/useScrollLock';
import { formatTime } from '@shared/hooks/useFormatTime';
import { BetResultTypeEnum } from '../model/stats-config';
import type { BetResultType } from '../model/stats-config';

interface BetsModalProps {
  type: BetResultType;
  onClose: () => void;
}

const BetsModal = ({ type, onClose }: BetsModalProps) => {
  const { data } = useGetHistory();
  useScrollLock(true);

  const sorted = useMemo<History[]>(() => {
    if (!data) return [];
    if (type === BetResultTypeEnum.WIN) {
      return [...data]
        .filter((b) => b.isWin)
        .sort((a, b) => b.payout - a.payout);
    }
    return [...data]
      .filter((b) => !b.isWin)
      .sort((a, b) => b.amount - a.amount);
  }, [data, type]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="bets-modal-overlay" onClick={handleOverlayClick}>
      <div className="bets-modal">
        <div className="bets-modal__header">
          <span className="bets-modal__title">
            {type === BetResultTypeEnum.WIN ? 'All Wins' : 'All Losses'}
          </span>
          <button
            type="button"
            className="bets-modal__close"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div className="bets-modal__body">
          {sorted.length === 0 ? (
            <div className="bets-modal__empty">
              No {type === BetResultTypeEnum.WIN ? 'wins' : 'losses'} yet
            </div>
          ) : (
            <ul className="bets-modal__list">
              {sorted.map((bet) => (
                <li key={bet.id} className="bets-modal__row">
                  <span className="bets-modal__row-currency">
                    {bet.currency}
                  </span>
                  <span className="bets-modal__row-amount">
                    {type === BetResultTypeEnum.WIN
                      ? `+${bet.payout.toFixed(2)}`
                      : `-${bet.amount.toFixed(2)}`}
                  </span>
                  <span
                    className={`bets-modal__row-badge bets-modal__row-badge--${type}`}
                  >
                    {type === BetResultTypeEnum.WIN ? 'WIN' : 'LOSS'}
                  </span>
                  <span className="bets-modal__row-time">
                    {formatTime(bet.timestamp)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default BetsModal;

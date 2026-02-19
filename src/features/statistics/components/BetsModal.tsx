import { useMemo } from 'react';
import { useGetHistory } from '@features/history/data-accses/action';
import type { History } from '@shared/types';

interface BetsModalProps {
  type: 'win' | 'loss';
  onClose: () => void;
}

const formatTime = (iso: string): string => {
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 1) return 'now';
  if (mins < 60) return `${mins}m`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h`;
  return `${Math.floor(hours / 24)}d`;
};

const BetsModal = ({ type, onClose }: BetsModalProps) => {
  const { data } = useGetHistory();

  const sorted = useMemo<History[]>(() => {
    if (!data) return [];
    if (type === 'win') {
      return [...data].filter((b) => b.isWin).sort((a, b) => b.payout - a.payout);
    }
    return [...data].filter((b) => !b.isWin).sort((a, b) => b.amount - a.amount);
  }, [data, type]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="bets-modal-overlay" onClick={handleOverlayClick}>
      <div className="bets-modal">
        <div className="bets-modal__header">
          <span className="bets-modal__title">
            {type === 'win' ? 'All Wins' : 'All Losses'}
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
            <div className="bets-modal__empty">No {type === 'win' ? 'wins' : 'losses'} yet</div>
          ) : (
            <ul className="bets-modal__list">
              {sorted.map((bet) => (
                <li key={bet.id} className="bets-modal__row">
                  <span className="bets-modal__row-currency">{bet.currency}</span>
                  <span className="bets-modal__row-amount">
                    {type === 'win' ? `+${bet.payout.toFixed(2)}` : `-${bet.amount.toFixed(2)}`}
                  </span>
                  <span className={`bets-modal__row-badge bets-modal__row-badge--${type}`}>
                    {type === 'win' ? 'WIN' : 'LOSS'}
                  </span>
                  <span className="bets-modal__row-time">{formatTime(bet.timestamp)}</span>
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

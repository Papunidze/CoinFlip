import type { History } from '@shared/types';
import { BetHistorySkeleton } from './BetHistorySkeleton';

const formatTime = (iso: string): string => {
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 1) return 'now';
  if (mins < 60) return `${mins}m`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h`;
  return `${Math.floor(hours / 24)}d`;
};

interface BetHistoryListProps {
  bets: History[];
  isLoading: boolean;
}

export const BetHistoryList = ({ bets, isLoading }: BetHistoryListProps) => {
  if (isLoading) return <BetHistorySkeleton />;

  return (
    <>
      {bets.map((bet) => (
        <div
          key={bet.id}
          className={`bet-history__row ${bet.isWin ? 'bet-history__row--win' : 'bet-history__row--lose'}`}
        >
          <span className="bet-history__row-currency">{bet.currency}</span>
          <span className="bet-history__row-amount">
            {bet.isWin
              ? `+${bet.payout.toFixed(2)}`
              : `-${bet.amount.toFixed(2)}`}
          </span>
          <span className="bet-history__row-outcome">
            {bet.isWin ? 'WIN' : 'LOSS'}
          </span>
          <span className="bet-history__row-time">{formatTime(bet.timestamp)}</span>
        </div>
      ))}
    </>
  );
};

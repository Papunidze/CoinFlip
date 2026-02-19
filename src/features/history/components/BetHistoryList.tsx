import type { History } from '@shared/types';
import { BetHistorySkeleton } from './BetHistorySkeleton';
import { formatTime } from '@shared/hooks/useFormatTime';

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
          <span className="bet-history__row-time">
            {formatTime(bet.timestamp)}
          </span>
        </div>
      ))}
    </>
  );
};

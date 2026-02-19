import { useGetHistory } from '../data-accses/action';
import { BetHistorySkeleton } from './BetHistorySkeleton';

export const BetHistoryList = () => {
  const { data, isLoading } = useGetHistory();

  if (isLoading) return <BetHistorySkeleton />;

  return (
    <>
      {data?.map((bet) => (
        <div
          key={bet.id}
          className={`bet-history__badge ${
            bet.isWin ? 'bet-history__badge--win' : 'bet-history__badge--lose'
          }`}
        >
          {bet.isWin
            ? `+${bet.payout.toFixed(2)}`
            : `-${bet.amount.toFixed(2)}`}
        </div>
      ))}
    </>
  );
};

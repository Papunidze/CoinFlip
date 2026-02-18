import { storage } from '@shared/api/storage';

export const BetHistoryList = () => {
  const history = storage.getHistory() || [];

  return (
    <>
      {history.length > 0
        ? history.map((bet) => (
            <div
              key={bet.timestamp}
              className={`bet-history__badge ${
                bet.isWin
                  ? 'bet-history__badge--win'
                  : 'bet-history__badge--lose'
              }`}
            >
              {bet.isWin
                ? `+${bet.payout.toFixed(2)}`
                : `-${bet.amount.toFixed(2)}`}
            </div>
          ))
        : null}
    </>
  );
};

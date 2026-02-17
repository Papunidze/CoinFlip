import './_history-module.scss';

interface BetRecord {
  id: number;
  won: boolean;
  amount: number;
  payout: number;
}

const mockBets: BetRecord[] = [
  { id: 1, won: true, amount: 10.0, payout: 19.0 },
  { id: 2, won: false, amount: 25.0, payout: 0 },
  { id: 3, won: true, amount: 5.0, payout: 9.5 },
  { id: 4, won: true, amount: 50.0, payout: 95.0 },
  { id: 5, won: false, amount: 100.0, payout: 0 },
  { id: 6, won: true, amount: 15.0, payout: 28.5 },
  { id: 7, won: false, amount: 30.0, payout: 0 },
  { id: 8, won: false, amount: 10.0, payout: 0 },
  { id: 9, won: true, amount: 20.0, payout: 38.0 },
  { id: 10, won: true, amount: 5.0, payout: 9.5 },
  { id: 11, won: false, amount: 75.0, payout: 0 },
  { id: 12, won: true, amount: 10.0, payout: 19.0 },
  { id: 13, won: true, amount: 40.0, payout: 76.0 },
  { id: 14, won: false, amount: 20.0, payout: 0 },
  { id: 15, won: true, amount: 10.0, payout: 19.0 },
  { id: 16, won: false, amount: 5.0, payout: 0 },
  { id: 17, won: true, amount: 35.0, payout: 66.5 },
  { id: 18, won: false, amount: 15.0, payout: 0 },
  { id: 19, won: true, amount: 50.0, payout: 95.0 },
  { id: 20, won: false, amount: 8.0, payout: 0 },
];

const BetHistory = () => {
  return (
    <div className="bet-history">
      <div className="bet-history__list">
        {mockBets.map((bet) => (
          <div
            key={bet.id}
            className={`bet-history__badge ${bet.won ? 'bet-history__badge--win' : 'bet-history__badge--lose'}`}
          >
            {bet.won ? `+${bet.payout.toFixed(2)}` : `-${bet.amount.toFixed(2)}`}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BetHistory;

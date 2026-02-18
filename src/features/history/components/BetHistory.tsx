import './_history-module.scss';
import BetHistoryList from './BetHistoryList';

const BetHistory = () => {
  return (
    <div className="bet-history">
      <div className="bet-history__list">
        <BetHistoryList />
      </div>
    </div>
  );
};

export default BetHistory;

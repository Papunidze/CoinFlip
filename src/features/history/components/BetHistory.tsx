import './_history-module.scss';
import { useBetHistory } from '../hooks/useBetHistory';
import { HistoryFilter } from './HistoryFilter';
import { BetHistoryList } from './BetHistoryList';

const BetHistory = () => {
  const { bets, isLoading, filterType, setFilterType } = useBetHistory();

  return (
    <div className="bet-history">
      <HistoryFilter activeFilter={filterType} onChange={setFilterType} />
      <div className="bet-history__list">
        <BetHistoryList bets={bets} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default BetHistory;

import { FilterTypeEnum } from '../hooks/useBetHistory';
import type { FilterType } from '../hooks/useBetHistory';

const TABS: { label: string; value: FilterType }[] = [
  { label: 'All', value: FilterTypeEnum.ALL },
  { label: 'Wins', value: FilterTypeEnum.WIN },
  { label: 'Losses', value: FilterTypeEnum.LOSS },
];

interface HistoryFilterProps {
  activeFilter: FilterType;
  onChange: (filter: FilterType) => void;
}

export const HistoryFilter = ({ activeFilter, onChange }: HistoryFilterProps) => {
  return (
    <div className="bet-history__filter" role="tablist" aria-label="Filter bet history">
      {TABS.map((tab) => (
        <button
          key={tab.value}
          role="tab"
          aria-selected={activeFilter === tab.value}
          className={`bet-history__filter-tab${activeFilter === tab.value ? ' bet-history__filter-tab--active' : ''}`}
          onClick={() => onChange(tab.value)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

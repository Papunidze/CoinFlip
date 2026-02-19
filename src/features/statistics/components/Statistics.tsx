import type { BetStats } from '@shared/types';
import { STAT_ITEMS } from '../model/stats-config';
import { StatRow } from './StatRow';
import { WinLossRatio } from './WinLossRatio';
import { ProfitValue } from './ProfitValue';
import './_statistics-module.scss';

interface StatisticsProps {
  stats: BetStats;
}

const Statistics = ({ stats }: StatisticsProps) => {
  const renderValue = (key: string, format: string, variant: string) => {
    const value = stats[key as keyof BetStats] as number;

    if (format === 'ratio') {
      return (
        <WinLossRatio
          wins={stats.wins}
          losses={stats.losses}
          totalBets={stats.totalBets}
        />
      );
    }

    if (format === 'currency' && variant === 'dynamic') {
      return <ProfitValue value={value} />;
    }

    if (format === 'currency') {
      const sign = variant === 'win' ? '+' : variant === 'lose' ? '-' : '';
      const display = value > 0 ? `${sign}${value.toFixed(2)}` : '—';
      return (
        <span className={`statistics__value statistics__value--${variant}`}>
          {display}
        </span>
      );
    }

    return (
      <span className={`statistics__value statistics__value--${variant}`}>
        {value}
      </span>
    );
  };

  return (
    <div className="statistics">
      <div className="statistics__header">
        <span className="statistics__title">Statistics</span>
      </div>
      <div className="statistics__body">
        {STAT_ITEMS.map((item) => (
          <StatRow key={item.key} label={item.label}>
            {renderValue(item.key, item.format, item.variant)}
          </StatRow>
        ))}
      </div>
    </div>
  );
};

export default Statistics;

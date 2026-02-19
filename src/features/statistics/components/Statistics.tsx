import { useState } from 'react';
import type { BetStats } from '@shared/types';
import { STAT_ITEMS, BetResultTypeEnum, StatFormatEnum, ValueVariantEnum } from '../model/stats-config';
import type { BetResultType } from '../model/stats-config';
import { StatRow } from './StatRow';
import { WinLossRatio } from './WinLossRatio';
import { ProfitValue } from './ProfitValue';
import BetsModal from './BetsModal';
import './_statistics-module.scss';

interface StatisticsProps {
  stats: BetStats;
}

const Statistics = ({ stats }: StatisticsProps) => {
  const [popupType, setPopupType] = useState<BetResultType | null>(null);

  const renderValue = (key: string, format: string, variant: string) => {
    const value = stats[key as keyof BetStats] as number;

    if (format === StatFormatEnum.RATIO) {
      return (
        <WinLossRatio
          wins={stats.wins}
          losses={stats.losses}
          totalBets={stats.totalBets}
        />
      );
    }

    if (format === StatFormatEnum.CURRENCY && variant === ValueVariantEnum.DYNAMIC) {
      return <ProfitValue value={value} />;
    }

    if (format === StatFormatEnum.CURRENCY) {
      let sign: string;
      if (variant === ValueVariantEnum.WIN) {
        sign = '+';
      } else if (variant === ValueVariantEnum.LOSE) {
        sign = '-';
      } else {
        sign = '';
      }
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

  const getClickHandler = (key: string) => {
    if (key === 'biggestWin') return () => setPopupType(BetResultTypeEnum.WIN);
    if (key === 'biggestLoss') return () => setPopupType(BetResultTypeEnum.LOSS);
    return undefined;
  };

  return (
    <>
      <div className="statistics">
        <div className="statistics__header">
          <span className="statistics__title">Statistics</span>
        </div>
        <div className="statistics__body">
          {STAT_ITEMS.map((item) => (
            <StatRow
              key={item.key}
              label={item.label}
              onClick={getClickHandler(item.key)}
            >
              {renderValue(item.key, item.format, item.variant)}
            </StatRow>
          ))}
        </div>
      </div>
      {popupType !== null && (
        <BetsModal type={popupType} onClose={() => setPopupType(null)} />
      )}
    </>
  );
};

export default Statistics;

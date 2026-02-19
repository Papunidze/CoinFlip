import { ValueVariantEnum } from '../model/stats-config';

interface ProfitValueProps {
  value: number;
}

export const ProfitValue = ({ value }: ProfitValueProps) => {
  const variant = value > 0 ? ValueVariantEnum.WIN : value < 0 ? ValueVariantEnum.LOSE : ValueVariantEnum.NEUTRAL;
  const sign = value > 0 ? '+' : '';

  return (
    <span className={`statistics__value statistics__value--${variant}`}>
      {sign}{value.toFixed(2)}
    </span>
  );
};

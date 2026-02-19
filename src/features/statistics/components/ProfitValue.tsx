import { ValueVariantEnum } from '../model/stats-config';

interface ProfitValueProps {
  value: number;
}

export const ProfitValue = ({ value }: ProfitValueProps) => {
  let variant: string;
  if (value > 0) {
    variant = ValueVariantEnum.WIN;
  } else if (value < 0) {
    variant = ValueVariantEnum.LOSE;
  } else {
    variant = ValueVariantEnum.NEUTRAL;
  }
  const sign = value > 0 ? '+' : '';

  return (
    <span className={`statistics__value statistics__value--${variant}`}>
      {sign}{value.toFixed(2)}
    </span>
  );
};

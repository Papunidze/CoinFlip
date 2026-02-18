interface ProfitValueProps {
  value: number;
}

export const ProfitValue = ({ value }: ProfitValueProps) => {
  const variant = value > 0 ? 'win' : value < 0 ? 'lose' : 'neutral';
  const sign = value > 0 ? '+' : '';

  return (
    <span className={`statistics__value statistics__value--${variant}`}>
      {sign}{value.toFixed(2)}
    </span>
  );
};

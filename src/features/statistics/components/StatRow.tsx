interface StatRowProps {
  label: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export const StatRow = ({ label, children, onClick }: StatRowProps) => {
  if (onClick) {
    return (
      <button type="button" className="statistics__row statistics__row--clickable" onClick={onClick}>
        <span className="statistics__label">{label}</span>
        <div className="statistics__value-wrap">{children}</div>
      </button>
    );
  }
  return (
    <div className="statistics__row">
      <span className="statistics__label">{label}</span>
      <div className="statistics__value-wrap">{children}</div>
    </div>
  );
};

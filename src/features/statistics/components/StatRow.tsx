interface StatRowProps {
  label: string;
  children: React.ReactNode;
}

export const StatRow = ({ label, children }: StatRowProps) => (
  <div className="statistics__row">
    <span className="statistics__label">{label}</span>
    <div className="statistics__value-wrap">{children}</div>
  </div>
);

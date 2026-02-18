interface WinLossRatioProps {
  wins: number;
  losses: number;
  totalBets: number;
}

export const WinLossRatio = ({ wins, losses, totalBets }: WinLossRatioProps) => {
  const winRate = totalBets > 0 ? Math.round((wins / totalBets) * 100) : 0;

  return (
    <div className="statistics__ratio">
      <span className="statistics__ratio-win">{wins}</span>
      <span className="statistics__ratio-sep">/</span>
      <span className="statistics__ratio-lose">{losses}</span>
      {totalBets > 0 && (
        <span className="statistics__ratio-pct">({winRate}%)</span>
      )}
    </div>
  );
};

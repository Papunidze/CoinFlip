const SKELETON_COUNT = 8;

export const BetHistorySkeleton = () => {
  return (
    <>
      {Array.from({ length: SKELETON_COUNT }, (_, i) => (
        <div key={i} className="bet-history__row bet-history__row--skeleton" />
      ))}
    </>
  );
};

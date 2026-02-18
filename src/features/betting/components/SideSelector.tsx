import type { CoinSide } from '@shared/types';

interface Props {
  selected: CoinSide;
  onChange: (side: CoinSide) => void;
  disabled: boolean;
}

export const SideSelector = ({ selected, onChange, disabled }: Props) => (
  <div className="bet-controller__side-switch">
    {(['heads', 'tails'] as const).map((side) => (
      <button
        key={side}
        className={`bet-controller__side-btn ${selected === side ? 'bet-controller__side-btn--active' : ''}`}
        onClick={() => onChange(side)}
        disabled={disabled}
      >
        {side.toUpperCase()}
      </button>
    ))}
  </div>
);

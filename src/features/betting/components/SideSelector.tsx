import type { CoinSide } from '@shared/types';

interface Props {
  selected: CoinSide;
  onChange: (side: CoinSide) => void;
  disabled: boolean;
}

export const SideSelector = ({ selected, onChange, disabled }: Props) => (
  <div className="bet-controller__side-switch" role="group" aria-label="Choose coin side">
    {(['heads', 'tails'] as const).map((side) => (
      <button
        key={side}
        className={`bet-controller__side-btn ${selected === side ? 'bet-controller__side-btn--active' : ''}`}
        onClick={() => onChange(side)}
        disabled={disabled}
        aria-pressed={selected === side}
        aria-label={`Bet on ${side}`}
      >
        {side.toUpperCase()}
      </button>
    ))}
  </div>
);

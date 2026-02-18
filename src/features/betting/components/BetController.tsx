import { useBetForm } from '../hooks/useBetForm';
import { SideSelector } from './SideSelector';
import { CurrencyTabs } from './CurrencyTabs';
import { AmountControls } from './AmountControls';
import { AutoBetConfig } from './AutoBetConfig';
import type { CoinSide } from '@shared/types';

import './_betting-module.scss';

interface BetControllerProps {
  onBet: (side: CoinSide, amount: number) => void;
  disabled: boolean;
  onSideChange: (side: CoinSide) => void;
  selectedSide: CoinSide;
}

const BetController = ({
  onBet,
  disabled,
  onSideChange,
  selectedSide,
}: BetControllerProps) => {
  const form = useBetForm();

  return (
    <div className="bet-controller">
      <SideSelector
        selected={selectedSide}
        onChange={onSideChange}
        disabled={disabled}
      />

      <div className="bet-controller__panel">
        <CurrencyTabs
          selected={form.currency}
          onChange={form.setCurrency}
          disabled={disabled}
        />

        <AmountControls
          amount={form.amount}
          onAdjust={form.adjustAmount}
          onAdd={form.addAmount}
          onSet={form.setAmount}
          disabled={disabled}
        />

        <AutoBetConfig
          isEnabled={form.isAuto}
          onToggle={form.setIsAuto}
          stopWin={form.stopWin}
          onStopWinChange={form.setStopWin}
          stopLoss={form.stopLoss}
          onStopLossChange={form.setStopLoss}
          disabled={disabled}
        />
      </div>

      <button
        className="bet-controller__place-bet"
        onClick={() => onBet(selectedSide, form.amount)}
        disabled={disabled}
      >
        <span className="bet-controller__bet-amount">
          {form.amount.toFixed(2)}
        </span>
        <span className="bet-controller__bet-label">Bet</span>
      </button>
    </div>
  );
};

export default BetController;

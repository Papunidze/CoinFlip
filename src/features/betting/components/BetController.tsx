import { SideSelector } from './SideSelector';
import { CurrencyTabs } from './CurrencyTabs';
import { AmountControls } from './AmountControls';
import { AutoBetConfig } from './AutoBetConfig';
import BetButton from './BetButton';

import type { CoinSide } from '@shared/types';
import type { BetFormState } from '../hooks/useBetForm';

import './_betting-module.scss';

interface BetControllerProps {
  onBet: (side: CoinSide) => void;
  disabled: boolean;
  isAutoActive: boolean;
  nextBetAmount: number | null;
  form: BetFormState;
  maxAmount: number;
  onSideChange: (side: CoinSide) => void;
  selectedSide: CoinSide;
}

const BetController = ({
  onBet,
  disabled,
  isAutoActive,
  nextBetAmount,
  form,
  maxAmount,
  onSideChange,
  selectedSide,
}: BetControllerProps) => {
  const controlsDisabled = disabled || isAutoActive;

  return (
    <div className="bet-controller">
      <SideSelector
        selected={selectedSide}
        onChange={onSideChange}
        disabled={controlsDisabled}
      />

      <div className="bet-controller__panel">
        <CurrencyTabs
          selected={form.currency}
          onChange={form.setCurrency}
          disabled={controlsDisabled}
        />

        <AmountControls
          amount={form.amount}
          maxAmount={maxAmount}
          onSet={form.setAmount}
          disabled={controlsDisabled}
          nextBetAmount={nextBetAmount}
        />

        <AutoBetConfig
          isEnabled={form.isAuto}
          onToggle={form.setIsAuto}
          stopWin={form.stopWin}
          onStopWinChange={form.setStopWin}
          isMartingale={form.isMartingale}
          onMartinagale={form.setIsMartingale}
          stopLoss={form.stopLoss}
          onStopLossChange={form.setStopLoss}
          disabled={controlsDisabled}
        />
      </div>

      <BetButton
        onBet={() => onBet(selectedSide)}
        amount={form.amount}
        currency={form.currency}
        isAuto={form.isAuto}
        isAutoActive={isAutoActive}
        disabled={disabled}
        maxAmount={maxAmount}
        nextBetAmount={nextBetAmount}
      />
    </div>
  );
};

export default BetController;

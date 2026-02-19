import { AnimatePresence, motion } from 'framer-motion';
import type { AnimationPhase, CoinSide, Currency } from '@shared/types';

import CoinSpin from './CoinSpin';
import CurrencyCoin from './CurrencyCoin';
import './_game-module.scss';
import { AnimationPresets } from '../model/animation';
import { AnimationPhaseEnum, CoinSideEnum } from '@shared/types/coin';

interface CoinFlipProps {
  phase: AnimationPhase;
  result: CoinSide | null;
  hasWon: boolean | null;
  selectedSide: CoinSide;
  currency: Currency;
}

const CoinFlip = ({
  phase,
  result,
  hasWon,
  selectedSide,
  currency,
}: CoinFlipProps) => {
  return (
    <div className="coin-flip-page">
      <div className="coin-flip-panel">
        <div className="coin-flip-panel__body">
          <div className="coin-flip-panel__animation">
            <AnimatePresence mode="wait">
              {phase === AnimationPhaseEnum.SPINNING ? (
                <motion.div
                  key="spin"
                  className="coin-flip-panel__scene"
                  {...AnimationPresets.COIN_SPIN}
                >
                  <CoinSpin result={result || CoinSideEnum.HEADS} currency={currency} />
                </motion.div>
              ) : (
                <motion.div
                  key="coin"
                  className={`coin-flip-panel__scene ${phase === AnimationPhaseEnum.IDLE ? 'coin-flip-panel__scene--idle' : ''}`}
                  {...AnimationPresets.COIN_IDLE}
                >
                  <CurrencyCoin
                    side={
                      phase === AnimationPhaseEnum.IDLE
                        ? selectedSide
                        : result || CoinSideEnum.HEADS
                    }
                    currency={currency}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {phase === AnimationPhaseEnum.RESULT && hasWon !== null && (
              <motion.div
                className="coin-flip-panel__result"
                {...AnimationPresets.RESULT_APPEAR}
              >
                <div
                  className={`coin-flip-panel__result-text ${
                    hasWon
                      ? 'coin-flip-panel__result-text--win'
                      : 'coin-flip-panel__result-text--lose'
                  }`}
                >
                  {hasWon ? 'You Win!' : 'You Lose!'}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default CoinFlip;

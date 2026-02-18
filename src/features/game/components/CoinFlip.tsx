import { AnimatePresence, motion } from 'framer-motion';
import type { AnimationPhase, CoinSide } from '@shared/types';

import CoinSpin from './CoinSpin';
import BitcoinCoin from './BitcoinCoin';
import './_game-module.scss';
import { AnimationPresets } from '../model/animation';

interface CoinFlipProps {
  phase: AnimationPhase;
  result: CoinSide | null;
  hasWon: boolean | null;
  selectedSide: CoinSide;
}

const CoinFlip = ({ phase, result, hasWon, selectedSide }: CoinFlipProps) => {
  return (
    <div className="coin-flip-page">
      <div className="coin-flip-panel">
        <div className="coin-flip-panel__body">
          <div className="coin-flip-panel__animation">
            <AnimatePresence mode="wait">
              {phase === 'spinning' ? (
                <motion.div
                  key="spin"
                  className="coin-flip-panel__scene"
                  {...AnimationPresets.COIN_SPIN}
                >
                  <CoinSpin result={result || 'heads'} />
                </motion.div>
              ) : (
                <motion.div
                  key="coin"
                  className={`coin-flip-panel__scene ${phase === 'idle' ? 'coin-flip-panel__scene--idle' : ''}`}
                  {...AnimationPresets.COIN_IDLE}
                >
                  <BitcoinCoin
                    side={phase === 'idle' ? selectedSide : result || 'heads'}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {phase === 'result' && hasWon !== null && (
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

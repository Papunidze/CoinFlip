import { AnimatePresence, motion } from 'framer-motion';
import { useCoinFlip } from '../../hooks/useCoinFlip';
import CoinSpin from './CoinSpin';
import BitcoinCoin from './BitcoinCoin';
import './CoinFlip.scss';

const CoinFlip = () => {
  const { phase, result, hasWon } = useCoinFlip();

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
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.2 }}
                >
                  <CoinSpin result={result || 'heads'} />
                </motion.div>
              ) : (
                <motion.div
                  key="coin"
                  className={`coin-flip-panel__scene ${phase === 'idle' ? 'coin-flip-panel__scene--idle' : ''}`}
                  initial={{ opacity: 0, scale: 0.75, rotateX: 40 }}
                  animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                  exit={{ opacity: 0, scale: 0.5, rotateX: -30 }}
                  transition={{
                    duration: 0.35,
                    type: 'spring',
                    damping: 16,
                    stiffness: 180,
                  }}
                >
                  <BitcoinCoin side={result || 'heads'} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {phase === 'result' && hasWon !== null && (
              <motion.div
                className="coin-flip-panel__result"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
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
                <div className="coin-flip-panel__result-detail">
                  Coin landed on {result}
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

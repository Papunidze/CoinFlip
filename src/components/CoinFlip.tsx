import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCoinFlip, type CoinSide } from '../hooks/useCoinFlip';
import CoinSpin from './svg/CoinSpin';
import BitcoinCoin from './svg/BitcoinCoin';
import './CoinFlip.scss';

const CoinFlip = () => {
  const [choice, setChoice] = useState<CoinSide>('heads');
  const { phase, result, hasWon, flip } = useCoinFlip();
  const [stats, setStats] = useState({ total: 0, wins: 0 });
  const prevHasWon = useRef<boolean | null>(null);

  useEffect(() => {
    if (hasWon !== null && hasWon !== prevHasWon.current) {
      prevHasWon.current = hasWon;
      setStats((s) => ({
        total: s.total + 1,
        wins: s.wins + (hasWon ? 1 : 0),
      }));
    }
  }, [hasWon]);

  const canInteract = phase === 'idle';

  return (
    <div className="coin-flip-page">
      <div className="coin-flip-panel">
        <div className="coin-flip-panel__header">
          <h1 className="coin-flip-panel__title">Coin Flip</h1>
          <span className="coin-flip-panel__subtitle">Pick a side & flip</span>
        </div>

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

          <div className="coin-flip-panel__controls">
            <div className="coin-flip-panel__choices">
              <button
                className={`coin-flip-panel__choice ${choice === 'heads' ? 'coin-flip-panel__choice--active' : ''}`}
                onClick={() => setChoice('heads')}
                disabled={!canInteract}
              >
                Heads
              </button>
              <button
                className={`coin-flip-panel__choice ${choice === 'tails' ? 'coin-flip-panel__choice--active' : ''}`}
                onClick={() => setChoice('tails')}
                disabled={!canInteract}
              >
                Tails
              </button>
            </div>

            <button
              className="coin-flip-panel__flip-btn"
              onClick={() => flip(choice)}
              disabled={!canInteract}
            >
              {canInteract ? 'Flip Coin' : 'Flipping...'}
            </button>
          </div>

          <div className="coin-flip-panel__footer">
            <div className="coin-flip-panel__stat">
              Flips <span>{stats.total}</span>
            </div>
            <div className="coin-flip-panel__stat">
              Wins <span>{stats.wins}</span>
            </div>
            <div className="coin-flip-panel__stat">
              Losses <span>{stats.total - stats.wins}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinFlip;

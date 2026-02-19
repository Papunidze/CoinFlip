import { useEffect, useRef, type CSSProperties } from 'react';
import { CoinShell, HeadsFace, TailsFace, THEMES } from './CurrencyCoin';
import type { CoinSide, Currency } from '@shared/types';

const SPIN_COUNT = 10;
const DEFAULT_ANGLE = 360 * SPIN_COUNT;
const SPIN_ANGLE = 378 * SPIN_COUNT;

interface CoinSpinProps {
  result: CoinSide;
  currency: Currency;
}

const CoinSpin = ({ result, currency }: CoinSpinProps) => {
  const rotatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rotatorRef.current;
    if (!el) return;

    el.getBoundingClientRect();
    el.classList.add('coin-spin__rotator--spinning');
  }, []);

  const endAngle = result === 'tails' ? SPIN_ANGLE : DEFAULT_ANGLE;
  const theme = THEMES[currency];

  return (
    <div className="coin-spin">
      <div
        ref={rotatorRef}
        className="coin-spin__rotator"
        style={{ '--end-angle': `${endAngle}deg` } as CSSProperties}
      >
        <div className="coin-spin__face coin-spin__face--front">
          <svg
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <CoinShell id={`cs-${currency}-heads`} theme={theme}>
              <HeadsFace currency={currency} color={theme.symbol} />
            </CoinShell>
          </svg>
        </div>

        <div className="coin-spin__face coin-spin__face--back">
          <svg
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <CoinShell id={`cs-${currency}-tails`} theme={theme}>
              <TailsFace color={theme.symbol} />
            </CoinShell>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CoinSpin;

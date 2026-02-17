import { useEffect, useRef, type CSSProperties } from 'react';
import { CoinBase, HeadsFace, TailsFace } from './BitcoinCoin';

interface CoinSpinProps {
  result: 'heads' | 'tails';
}

const CoinSpin = ({ result }: CoinSpinProps) => {
  const rotatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rotatorRef.current;
    if (!el) return;

    el.getBoundingClientRect();
    el.classList.add('coin-spin__rotator--spinning');
  }, []);

  const endAngle = result === 'tails' ? 3780 : 3600;

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
            <CoinBase id="cs-heads">
              <HeadsFace />
            </CoinBase>
          </svg>
        </div>

        <div className="coin-spin__face coin-spin__face--back">
          <svg
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <CoinBase id="cs-tails">
              <TailsFace />
            </CoinBase>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CoinSpin;

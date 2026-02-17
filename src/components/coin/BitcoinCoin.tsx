interface BitcoinCoinProps {
  side: 'heads' | 'tails';
}

const CoinBase = ({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) => (
  <>
    <defs>
      <radialGradient id={`${id}-face`} cx="0.42" cy="0.38" r="0.6">
        <stop offset="0%" stopColor="#FFD84A" />
        <stop offset="60%" stopColor="#F5B800" />
        <stop offset="100%" stopColor="#D4960A" />
      </radialGradient>
      <linearGradient id={`${id}-rim`} x1="0.2" y1="0.1" x2="0.8" y2="0.9">
        <stop offset="0%" stopColor="#D4A00C" />
        <stop offset="100%" stopColor="#A07008" />
      </linearGradient>
    </defs>

    {/* Outer rim */}
    <circle cx="100" cy="100" r="96" fill={`url(#${id}-rim)`} />

    {/* Gold face */}
    <circle cx="100" cy="100" r="88" fill={`url(#${id}-face)`} />

    {/* Inner ring */}
    <circle
      cx="100"
      cy="100"
      r="88"
      fill="none"
      stroke="#C89A10"
      strokeWidth="1.5"
      opacity="0.4"
    />

    {children}

    <ellipse cx="90" cy="62" rx="40" ry="22" fill="rgba(255,255,255,0.15)" />
  </>
);

const HeadsFace = () => (
  <g transform="translate(100, 100)">
    <path
      d={`M-18,-32 L4,-32 C18,-32 26,-24 26,-16 C26,-9 20,-3 12,-1
          C22,1 30,9 30,18 C30,28 20,36 4,36 L-18,36 Z
          M-9,-24 L2,-24 C10,-24 16,-20 16,-14 C16,-8 10,-4 2,-4 L-9,-4 Z
          M-9,4 L4,4 C13,4 20,10 20,17 C20,24 13,30 4,30 L-9,30 Z`}
      fill="#A07008"
      fillRule="evenodd"
    />
    <rect x="-7" y="-42" width="4.5" height="12" rx="2.2" fill="#A07008" />
    <rect x="5" y="-42" width="4.5" height="12" rx="2.2" fill="#A07008" />
    <rect x="-7" y="34" width="4.5" height="12" rx="2.2" fill="#A07008" />
    <rect x="5" y="34" width="4.5" height="12" rx="2.2" fill="#A07008" />
  </g>
);

const TailsFace = () => (
  <g transform="translate(100, 100)">
    {Array.from({ length: 16 }, (_, i) => {
      const a = (i / 16) * Math.PI * 2;
      return (
        <circle
          key={i}
          cx={Math.cos(a) * 58}
          cy={Math.sin(a) * 58}
          r="2"
          fill="#A07008"
        />
      );
    })}
    <circle cx="0" cy="0" r="28" fill="none" stroke="#A07008" strokeWidth="2" />
    <polygon
      points="0,-18 5,-7 17,-7 8,1 11,14 0,8 -11,14 -8,1 -17,-7 -5,-7"
      fill="#A07008"
    />
  </g>
);

const BitcoinCoin = ({ side }: BitcoinCoinProps) => {
  const id = `bc-${side}`;
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="bitcoin-coin"
    >
      <CoinBase id={id}>
        {side === 'heads' ? <HeadsFace /> : <TailsFace />}
      </CoinBase>
    </svg>
  );
};

export default BitcoinCoin;
export { CoinBase, HeadsFace, TailsFace };

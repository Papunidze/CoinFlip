import type { CoinSide, Currency } from '@shared/types';

interface CurrencyCoinProps {
  side: CoinSide;
  currency: Currency;
}

const THEMES: Record<
  Currency,
  {
    face: [string, string, string];
    rim: [string, string];
    stroke: string;
    symbol: string;
  }
> = {
  BTC: {
    face: ['#FFE566', '#F5B800', '#D4860A'],
    rim: ['#D4A00C', '#8A5800'],
    stroke: '#FFD84A',
    symbol: 'rgba(255,255,255,0.88)',
  },
  ETH: {
    face: ['#8AA4F6', '#627EEA', '#4358C0'],
    rim: ['#4358C0', '#2B3890'],
    stroke: '#7B90E8',
    symbol: 'rgba(255,255,255,0.88)',
  },
  SOL: {
    face: ['#C084FC', '#9945FF', '#7020D8'],
    rim: ['#7020D8', '#4A10A8'],
    stroke: '#A87FFF',
    symbol: 'rgba(255,255,255,0.9)',
  },
};

const CoinShell = ({
  id,
  theme,
  children,
}: {
  id: string;
  theme: (typeof THEMES)[Currency];
  children: React.ReactNode;
}) => (
  <>
    <defs>
      <radialGradient id={`${id}-face`} cx="0.42" cy="0.38" r="0.6">
        <stop offset="0%" stopColor={theme.face[0]} />
        <stop offset="60%" stopColor={theme.face[1]} />
        <stop offset="100%" stopColor={theme.face[2]} />
      </radialGradient>
      <linearGradient id={`${id}-rim`} x1="0.2" y1="0.1" x2="0.8" y2="0.9">
        <stop offset="0%" stopColor={theme.rim[0]} />
        <stop offset="100%" stopColor={theme.rim[1]} />
      </linearGradient>
    </defs>
    <circle cx="100" cy="100" r="96" fill={`url(#${id}-rim)`} />
    <circle cx="100" cy="100" r="88" fill={`url(#${id}-face)`} />
    <circle cx="100" cy="100" r="88" fill="none" stroke={theme.stroke} strokeWidth="1.5" opacity="0.4" />
    {children}
    <ellipse cx="90" cy="62" rx="40" ry="22" fill="rgba(255,255,255,0.15)" />
  </>
);

const BtcHeads = ({ color }: { color: string }) => (
  <g transform="translate(100, 100)">
    <path
      d={`M-18,-32 L4,-32 C18,-32 26,-24 26,-16 C26,-9 20,-3 12,-1
          C22,1 30,9 30,18 C30,28 20,36 4,36 L-18,36 Z
          M-9,-24 L2,-24 C10,-24 16,-20 16,-14 C16,-8 10,-4 2,-4 L-9,-4 Z
          M-9,4 L4,4 C13,4 20,10 20,17 C20,24 13,30 4,30 L-9,30 Z`}
      fill={color}
      fillRule="evenodd"
    />
    <rect x="-7" y="-42" width="4.5" height="12" rx="2.2" fill={color} />
    <rect x="5" y="-42" width="4.5" height="12" rx="2.2" fill={color} />
    <rect x="-7" y="34" width="4.5" height="12" rx="2.2" fill={color} />
    <rect x="5" y="34" width="4.5" height="12" rx="2.2" fill={color} />
  </g>
);

const EthHeads = () => (
  <g transform="translate(100, 100)">
    <path d="M0,-38 L-24,-2 L0,9 Z" fill="rgba(255,255,255,0.6)" />
    <path d="M0,-38 L24,-2 L0,9 Z" fill="rgba(255,255,255,0.92)" />
    <path d="M0,38 L-24,2 L0,9 Z" fill="rgba(255,255,255,0.35)" />
    <path d="M0,38 L24,2 L0,9 Z" fill="rgba(255,255,255,0.55)" />
  </g>
);

const SolHeads = () => (
  <g transform="translate(100, 100)">
    <path d="M-26,-13 L20,-13 L26,-23 L-20,-23 Z" fill="rgba(255,255,255,0.9)" />
    <path d="M-26,5 L20,5 L26,-5 L-20,-5 Z" fill="rgba(255,255,255,0.7)" />
    <path d="M-26,23 L20,23 L26,13 L-20,13 Z" fill="rgba(255,255,255,0.9)" />
  </g>
);

const TailsFace = ({ color }: { color: string }) => (
  <g transform="translate(100, 100)">
    {Array.from({ length: 16 }, (_, i) => {
      const a = (i / 16) * Math.PI * 2;
      return (
        <circle key={i} cx={Math.cos(a) * 58} cy={Math.sin(a) * 58} r="2" fill={color} />
      );
    })}
    <circle cx="0" cy="0" r="28" fill="none" stroke={color} strokeWidth="2" />
    <polygon points="0,-18 5,-7 17,-7 8,1 11,14 0,8 -11,14 -8,1 -17,-7 -5,-7" fill={color} />
  </g>
);

const HeadsFace = ({ currency, color }: { currency: Currency; color: string }) => {
  if (currency === 'ETH') return <EthHeads />;
  if (currency === 'SOL') return <SolHeads />;
  return <BtcHeads color={color} />;
};

const CurrencyCoin = ({ side, currency }: CurrencyCoinProps) => {
  const theme = THEMES[currency];
  const id = `cc-${currency}-${side}`;
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="bitcoin-coin"
    >
      <CoinShell id={id} theme={theme}>
        {side === 'heads' ? (
          <HeadsFace currency={currency} color={theme.symbol} />
        ) : (
          <TailsFace color={theme.symbol} />
        )}
      </CoinShell>
    </svg>
  );
};

export default CurrencyCoin;
export { CoinShell, HeadsFace, TailsFace, THEMES };

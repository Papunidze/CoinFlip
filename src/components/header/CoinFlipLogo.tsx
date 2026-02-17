const CoinFlipLogo = () => {
  return (
    <div className="topbar__logo">
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="topbar__logo-icon"
      >
        <defs>
          <radialGradient id="logo-face" cx="0.42" cy="0.38" r="0.6">
            <stop offset="0%" stopColor="#FFD84A" />
            <stop offset="60%" stopColor="#F5B800" />
            <stop offset="100%" stopColor="#D4960A" />
          </radialGradient>
          <linearGradient id="logo-rim" x1="0.2" y1="0.1" x2="0.8" y2="0.9">
            <stop offset="0%" stopColor="#D4A00C" />
            <stop offset="100%" stopColor="#A07008" />
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r="96" fill="url(#logo-rim)" />
        <circle cx="100" cy="100" r="88" fill="url(#logo-face)" />
        <circle
          cx="100"
          cy="100"
          r="88"
          fill="none"
          stroke="#C89A10"
          strokeWidth="1.5"
          opacity="0.4"
        />
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
        <ellipse cx="90" cy="62" rx="40" ry="22" fill="rgba(255,255,255,0.15)" />
      </svg>
      <span className="topbar__logo-text">CoinFlip</span>
    </div>
  );
};

export default CoinFlipLogo;

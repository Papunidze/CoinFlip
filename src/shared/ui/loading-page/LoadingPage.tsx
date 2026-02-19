import { CoinBase, HeadsFace, TailsFace } from '@features/game/components/BitcoinCoin';
import './_loading-page.scss';

const FlippingCoin = ({ delay }: { delay: number }) => (
  <div className="loading-page__coin" style={{ animationDelay: `${delay}s` }}>
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <CoinBase id={`loading-${delay}`}>
        <HeadsFace />
      </CoinBase>
    </svg>
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <CoinBase id={`loading-t-${delay}`}>
        <TailsFace />
      </CoinBase>
    </svg>
  </div>
);

export const LoadingPage = () => {
  return (
    <div className="loading-page">
      <div className="loading-page__coins">
        <FlippingCoin delay={0} />
        <FlippingCoin delay={0.2} />
        <FlippingCoin delay={0.4} />
      </div>
      <p className="loading-page__text">
        Loading<span className="loading-page__dots" />
      </p>
    </div>
  );
};

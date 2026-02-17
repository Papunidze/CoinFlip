import { useState } from 'react';
import { Header } from '@shared/ui/header/components';
import { useCoinFlip } from '@features/game/hooks/useCoinFlip';
import type { CoinSide } from '@shared/types';
import { BetHistory } from '@features/history';
import { BetController } from '@features/betting';
import { CoinFlip } from '@features/game';

import './App.scss';

const App = () => {
  const [selectedSide, setSelectedSide] = useState<CoinSide>('heads');
  const { phase, result, hasWon, flip } = useCoinFlip();
  return (
    <>
      <Header />
      <div className="game-layout">
        <BetHistory />
        <main className="game-layout__main">
          <CoinFlip
            phase={phase}
            result={result}
            hasWon={hasWon}
            selectedSide={selectedSide}
          />
          <BetController
            onBet={(side) => flip(side)}
            disabled={phase !== 'idle'}
            onSideChange={setSelectedSide}
          />
        </main>
      </div>
    </>
  );
};

export default App;

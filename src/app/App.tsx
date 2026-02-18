import { useState } from 'react';
import { Header } from '@shared/ui/header/components';
import { useCoinFlip } from '@features/game/hooks/useCoinFlip';
import type { CoinSide } from '@shared/types';
import { BetHistory } from '@features/history';
import { BetController } from '@features/betting';
import { CoinFlip } from '@features/game';
import { Statistics, EMPTY_STATS } from '@features/statistics';
import { AuthPopup, useAuth } from '@features/auth';

import './App.scss';

const App = () => {
  const [selectedSide, setSelectedSide] = useState<CoinSide>('heads');
  const { phase, result, hasWon, flip } = useCoinFlip();
  const { user, isPopupOpen, login, openPopup, closePopup } = useAuth();

  return (
    <>
      <Header username={user.name} onProfileClick={openPopup} />
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
            selectedSide={selectedSide}
          />
        </main>
        <Statistics stats={EMPTY_STATS} />
      </div>
      {isPopupOpen && (
        <AuthPopup
          currentName={user.name}
          onSubmit={login}
          onClose={closePopup}
        />
      )}
    </>
  );
};

export default App;

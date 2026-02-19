import { useState } from 'react';
import { Header } from '@shared/ui/header/components';
import type { CoinSide } from '@shared/types';
import { BetHistory } from '@features/history';
import { BetController } from '@features/betting';
import { CoinFlip } from '@features/game';
import { Statistics, EMPTY_STATS } from '@features/statistics';
import { AuthPopup, useAuth } from '@features/auth';
import { useBet } from '@features/betting/hooks/useBet';

import './App.scss';

const App = () => {
  const [selectedSide, setSelectedSide] = useState<CoinSide>('heads');
  const { user, isPopupOpen, login, openPopup, closePopup, isPending } =
    useAuth();

  const { phase, result, hasWon, placeBet, isAutoActive, form, maxAmount } =
    useBet(user);

  return (
    <>
      {user !== null && <Header user={user} onProfileClick={openPopup} />}
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
            onBet={placeBet}
            disabled={phase !== 'idle'}
            isAutoActive={isAutoActive}
            form={form}
            maxAmount={maxAmount}
            onSideChange={setSelectedSide}
            selectedSide={selectedSide}
          />
        </main>
        <Statistics stats={EMPTY_STATS} />
      </div>

      {isPopupOpen && (
        <AuthPopup
          onSubmit={login}
          onClose={closePopup}
          isAuth={user !== null}
          isLoading={isPending}
        />
      )}
    </>
  );
};

export default App;

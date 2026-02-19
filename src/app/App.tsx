import { useState } from 'react';
import { Header } from '@shared/ui/header/components';
import { LoadingPage } from '@shared/ui/loading-page';
import type { CoinSide } from '@shared/types';
import { BetHistory } from '@features/history';
import { BetController } from '@features/betting';
import { CoinFlip } from '@features/game';
import { Statistics } from '@features/statistics';
import { AuthPopup, useAuth } from '@features/auth';
import { useBetSimulation } from '@features/betting/hooks/useBetSimulation';

import './App.scss';

const App = () => {
  const [selectedSide, setSelectedSide] = useState<CoinSide>('heads');
  const {
    user,
    isLoading,
    isPopupOpen,
    login,
    logout,
    openPopup,
    closePopup,
    isPending,
  } = useAuth();
  const { phase, result, hasWon, placeBet, isAutoActive, nextBetAmount, form, maxAmount } =
    useBetSimulation(user);

  if (isLoading) return <LoadingPage />;

  return (
    <>
      {user !== null && (
        <Header
          user={user}
          onProfileClick={openPopup}
          selectedCurrency={form.currency}
          onCurrencyChange={form.setCurrency}
        />
      )}
      <div className="game-layout">
        {user && <BetHistory />}
        <main className="game-layout__main">
          <CoinFlip
            phase={phase}
            result={result}
            hasWon={hasWon}
            selectedSide={selectedSide}
            currency={form.currency}
          />
          <BetController
            onBet={placeBet}
            disabled={phase !== 'idle'}
            isAutoActive={isAutoActive}
            nextBetAmount={nextBetAmount}
            form={form}
            maxAmount={maxAmount}
            onSideChange={setSelectedSide}
            selectedSide={selectedSide}
          />
        </main>
        {user && <Statistics stats={user.statistic} />}
      </div>

      {isPopupOpen && (
        <AuthPopup
          onSubmit={login}
          onClose={closePopup}
          onLogout={logout}
          isAuth={user !== null}
          userName={user?.name}
          isLoading={isPending}
        />
      )}
    </>
  );
};

export default App;

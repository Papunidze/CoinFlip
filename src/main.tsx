import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'sonner';
import '@styles/main.scss';
import App from '@app/App';
import { QueryProvider } from '@app/providers';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <App />
      <Toaster
        theme="dark"
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'var(--background-secondary)',
            border: '1px solid var(--glass-border-light)',
            color: 'var(--text-color-primary)',
            fontFamily: 'var(--font-family-base)',
          },
        }}
      />
    </QueryProvider>
  </StrictMode>,
);

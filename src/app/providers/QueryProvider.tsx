import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
  MutationCache,
} from '@tanstack/react-query';
import { useRef, type ReactNode } from 'react';
import { toast } from 'sonner';

interface QueryProviderProps {
  children: ReactNode;
}

const toMessage = (error: unknown): string =>
  error instanceof Error ? error.message : 'Something went wrong';

export const QueryProvider = ({ children }: QueryProviderProps) => {
  const queryClientRef = useRef<QueryClient>(
    new QueryClient({
      queryCache: new QueryCache({
        onError: (error) => toast.error(toMessage(error)),
      }),
      mutationCache: new MutationCache({
        onError: (error) => toast.error(toMessage(error)),
      }),
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60,
          retry: 1,
        },
      },
    }),
  );

  return (
    <QueryClientProvider client={queryClientRef.current}>
      {children}
    </QueryClientProvider>
  );
};

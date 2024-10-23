'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { trpc } from '../app/_trpc/client';
import { httpBatchLink } from '@trpc/client';

const Providers = ({ children }) => {
  const queryClient = new QueryClient();

  const trpcClient = trpc.createClient({
    links: [
      httpBatchLink({
        url: 'http://localhost:3000/api/trpc',
      }),
    ],
  });

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default Providers;


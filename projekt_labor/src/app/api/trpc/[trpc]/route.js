import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '~/trpc';

function handler(req) {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => ({}),  // Ensure no client-side code here
  });
}

export { handler as GET, handler as POST };



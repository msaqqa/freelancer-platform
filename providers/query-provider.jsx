'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const QueryProvider = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        // TanStack Query v5 reads these under defaultOptions.queries; passing
        // them at the top level is silently ignored.
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000,
            refetchOnWindowFocus: false,
            refetchOnMount: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export { QueryProvider };

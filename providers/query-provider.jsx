'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const QueryProvider = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: true,
        refetchOnMount: false,
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export { QueryProvider };

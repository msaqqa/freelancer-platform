'use client';

import { StoreClientProvider } from '@/app/(protected)/client/store-client/components/context';
import { StoreClientWrapper } from '@/app/(protected)/client/store-client/components/wrapper';

export function ModulesProvider({ children }) {
  return (
    <StoreClientProvider>
      <StoreClientWrapper>{children}</StoreClientWrapper>
    </StoreClientProvider>
  );
}

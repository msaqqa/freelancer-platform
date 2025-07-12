'use client';

import { useAuth } from '@/hooks/auth/use-auth';
import { StoreClientProvider as StoreClientProviderFromClient } from '@/app/(protected)/client/store-client/components/context';
import { StoreClientWrapper as StoreClientWrapperFromClient } from '@/app/(protected)/client/store-client/components/wrapper';
import { StoreClientProvider as StoreClientProviderFromFreelancer } from '@/app/(protected)/freelancer/store-client/components/context';
import { StoreClientWrapper as StoreClientWrapperFromFreelancer } from '@/app/(protected)/freelancer/store-client/components/wrapper';

export function ModulesProvider({ children }) {
  const { data: user } = useAuth();
  if (user?.type === 'client') {
    return (
      <StoreClientProviderFromClient>
        <StoreClientWrapperFromClient>{children}</StoreClientWrapperFromClient>
      </StoreClientProviderFromClient>
    );
  } else {
    return (
      <StoreClientProviderFromFreelancer>
        <StoreClientWrapperFromFreelancer>
          {children}
        </StoreClientWrapperFromFreelancer>
      </StoreClientProviderFromFreelancer>
    );
  }
}

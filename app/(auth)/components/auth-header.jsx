'use client';

import Link from 'next/link';
import { toAbsoluteUrl } from '@/lib/helpers';
import { AuthSwitchers } from './auth-switchers';
import { Container } from '@/components/common/container';

export function AuthHeader() {
  return (
    <header className="py-6 border-b border-border/50 bg-background/50 backdrop-blur-sm sticky top-0 z-50">
      <Container className="flex items-center justify-between">
        <Link href="/" className="shrink-0">
          <img
            src={toAbsoluteUrl('/media/app/mini-logo.svg')}
            className="h-[34px] w-auto"
            alt="logo"
          />
        </Link>
        <AuthSwitchers />
      </Container>
    </header>
  );
}

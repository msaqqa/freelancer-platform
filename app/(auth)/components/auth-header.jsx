'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Container } from '@/components/common/container';
import { AuthSwitchers } from './auth-switchers';

export function AuthHeader() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <header className="py-6 border-b border-border/50 bg-background/50 backdrop-blur-sm sticky top-0 z-50">
      <Container className="flex items-center justify-between">
        <Link href="/" className="shrink-0 flex items-center gap-2">
          <img
            src={toAbsoluteUrl(
              isDark
                ? '/media/app/default-logo-dark.svg'
                : '/media/app/default-logo.svg',
            )}
            className="h-10 w-auto hidden sm:block"
            alt="logo"
          />
        </Link>
        <AuthSwitchers />
      </Container>
    </header>
  );
}

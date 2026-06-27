'use client';

import Link from 'next/link';
import { LogOut } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useTranslation } from 'react-i18next';
import { toAbsoluteUrl } from '@/lib/helpers';
import { useAuth } from '@/hooks/auth/use-auth';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/common/container';
import { MinimalSwitchers } from './minimal-switchers';

// Lightweight header used by the auth and onboarding (new-user) flows: logo,
// language/theme switchers, and a logout action when the user is signed in
// (e.g. mid-onboarding) so they can always leave.
export function MinimalHeader() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { t } = useTranslation('common');
  const { data: user, signout } = useAuth();

  return (
    <header className="py-2 border-b border-border/50 bg-background/60 backdrop-blur-sm sticky top-0 z-50">
      <Container className="flex h-14 items-center justify-between">
        <Link href="/" className="shrink-0 flex items-center gap-2">
          <img
            src={toAbsoluteUrl(
              isDark
                ? '/media/app/default-logo-dark.svg'
                : '/media/app/default-logo.svg',
            )}
            className="h-12 w-auto hidden sm:block"
            alt="logo"
          />
        </Link>

        <div className="flex items-center gap-4">
          <MinimalSwitchers />

          {user && (
            <Button
              variant="outline"
              size="sm"
              onClick={signout}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">{t('logout')}</span>
            </Button>
          )}
        </div>
      </Container>
    </header>
  );
}

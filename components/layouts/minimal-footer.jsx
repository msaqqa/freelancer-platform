'use client';

import { useTranslation } from 'react-i18next';
import { Container } from '@/components/common/container';

// Lightweight footer shared by the auth and onboarding (new-user) flows.
export function MinimalFooter() {
  const { t } = useTranslation('common');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 border-t border-border/50 bg-background/50">
      <Container className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-muted-foreground">
          © {currentYear} Freelancer Platform. {t('allRightsReserved')}
        </div>
        <div className="flex items-center gap-6">
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            {t('terms')}
          </a>
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            {t('privacy')}
          </a>
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            {t('help')}
          </a>
        </div>
      </Container>
    </footer>
  );
}

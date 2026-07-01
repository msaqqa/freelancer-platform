'use client';

import { useTranslation } from 'react-i18next';
import { Container } from '@/components/common/container';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation('common');

  return (
    <footer className="footer mt-8 border-t border-border">
      <Container>
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-3 py-8">
          <div className="flex order-2 md:order-1  gap-2 font-normal text-sm flex-1 justify-center">
            <span className="text-muted-foreground">
              {t('allRightsReserved')} {currentYear} &copy;
            </span>
            <span className="text-secondary-foreground hover:text-primary">
              {t('platformName')}
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}

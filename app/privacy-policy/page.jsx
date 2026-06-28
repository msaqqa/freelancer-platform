'use client';

import { useTranslation } from 'react-i18next';
import { Container } from '@/components/common/container';

export default function PrivacyPolicy() {
  const { t } = useTranslation('privacyPolicy');
  const sections = t('sections', { returnObjects: true });

  return (
    <div className="flex flex-grow flex-col items-center">
      <Container className="max-w-3xl py-12 lg:py-16">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">
            {t('title')}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {t('lastUpdated', { date: t('date') })}
          </p>
        </header>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <section key={section.title}>
              <h2 className="mb-2 text-lg font-semibold">
                <span className="text-muted-foreground">{index + 1}.</span>{' '}
                {section.title}
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {section.body}
              </p>
            </section>
          ))}
        </div>
      </Container>
    </div>
  );
}

'use client';

import Link from 'next/link';
import {
  Briefcase,
  ChevronRight,
  DollarSign,
  FileText,
  Hourglass,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';

// TODO: wire `value`/`href` to real data once contracts, offers, proposals and
// earnings services exist. Values are static placeholders for now.
const STATS = [
  { key: 'activeContracts', icon: Briefcase, value: '0', href: '#' },
  { key: 'pendingOffers', icon: Hourglass, value: '0', href: '#' },
  { key: 'openProposals', icon: FileText, value: '1', href: '#' },
  { key: 'earnings', icon: DollarSign, value: '$0.00', href: '#', period: true },
];

export function StatsCards() {
  const { t } = useTranslation('freelancerDashboard');

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-7.5">
      {STATS.map(({ key, icon: Icon, value, href, period }) => (
        <Card key={key}>
          <CardContent className="flex flex-col gap-2.5 p-5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-medium uppercase text-secondary-foreground">
                {t(`stats.${key}`)}
                {period && (
                  <span className="ms-1 normal-case text-secondary-foreground/70">
                    {t('stats.earningsPeriod')}
                  </span>
                )}
              </span>
              <Icon className="size-4 text-muted-foreground shrink-0" />
            </div>
            <span className="text-2xl font-semibold text-mono">{value}</span>
            <span className="text-xs text-secondary-foreground">
              {t(`stats.${key}Hint`)}
            </span>
            <Link
              href={href}
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              {t(`stats.${key}Link`)}
              <ChevronRight className="size-3.5 rtl:rotate-180" />
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

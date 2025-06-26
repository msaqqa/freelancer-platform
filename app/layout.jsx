import { Suspense } from 'react';
import { Inter, Tajawal } from 'next/font/google';
import { cn } from '@/lib/utils';
import { SettingsProvider } from '@/providers/settings-provider';
import { TooltipsProvider } from '@/providers/tooltips-provider';
import { Toaster } from '@/components/ui/sonner';
import '@/css/styles.css';
import '@/components/keenicons/assets/styles.css';
import { cookies } from 'next/headers';
import { I18nProvider } from '@/providers/i18n-provider';
import { ModulesProvider } from '@/providers/modules-provider';
import { QueryProvider } from '@/providers/query-provider';
import { ThemeProvider } from '@/providers/theme-provider';

const inter = Inter({ subsets: ['latin'] });
const tajawal = Tajawal({ subsets: ['arabic'], weight: ['400', '700'] });

export const metadata = {
  title: {
    template: '%s | Taqat',
    default: 'Taqat Freelancer Platform', // a default is required when creating a template
  },
  icons: {
    icon: '/media/app/favicon.png',
  },
};

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const lang = cookieStore.get('language')?.value || 'en';
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  return (
    <html className="h-full" suppressHydrationWarning dir={dir}>
      <body
        className={cn(
          'antialiased flex h-full text-base text-foreground bg-background',
          lang == 'ar' ? tajawal.className : inter.className,
        )}
      >
        <QueryProvider>
          <SettingsProvider>
            <ThemeProvider>
              <I18nProvider lang={lang}>
                <TooltipsProvider>
                  <ModulesProvider>
                    <Suspense>{children}</Suspense>
                    <Toaster />
                  </ModulesProvider>
                </TooltipsProvider>
              </I18nProvider>
            </ThemeProvider>
          </SettingsProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

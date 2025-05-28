import { Suspense } from 'react';
import { Cairo, Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { SettingsProvider } from '@/providers/settings-provider';
import { TooltipsProvider } from '@/providers/tooltips-provider';
import { Toaster } from '@/components/ui/sonner';
import '@/css/styles.css';
import '@/components/keenicons/assets/styles.css';
import { cookies } from 'next/headers';
import { AuthProvider } from '@/providers/auth-provider';
import { I18nProvider } from '@/providers/i18n-provider';
import { ModulesProvider } from '@/providers/modules-provider';
import { QueryProvider } from '@/providers/query-provider';
import { ThemeProvider } from '@/providers/theme-provider';
import { getUserProfile } from '@/services/auth/auth';

const inter = Inter({ subsets: ['latin'] });
const cairo = Cairo({ subsets: ['arabic'] });

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
  // const UserIsAuth = await getUserProfile();

  const lang = cookies().get('language')?.value || 'en';
  return (
    <html className="h-full" suppressHydrationWarning lang="ar">
      <body
        className={cn(
          'antialiased flex h-full text-base text-foreground bg-background',
          lang == 'ar' ? cairo.className : inter.className,
        )}
      >
        <QueryProvider>
          <AuthProvider>
            <SettingsProvider>
              <ThemeProvider>
                <I18nProvider>
                  <TooltipsProvider>
                    <ModulesProvider>
                      <Suspense>{children}</Suspense>
                      <Toaster />
                    </ModulesProvider>
                  </TooltipsProvider>
                </I18nProvider>
              </ThemeProvider>
            </SettingsProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

import Link from 'next/link';
import { I18N_LANGUAGES } from '@/i18n/config';
import i18next from 'i18next';
import {
  BetweenHorizontalStart,
  Coffee,
  CreditCard,
  FileText,
  Globe,
  Moon,
  Settings,
  Shield,
  User,
  UserCircle,
  Users,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useTranslation } from 'react-i18next';
import { toAbsoluteUrl } from '@/lib/helpers';
import { useAuth } from '@/hooks/auth/use-auth';
import { useLanguage } from '@/providers/i18n-provider';
import { changeLang } from '@/services/auth/auth';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';

export function UserDropdownMenu({ trigger }) {
  const { data: session, signout } = useAuth();
  const { changeLanguage, language } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation('common');
  const type = session?.type ?? 'freelancer';

  const handleLanguage = async (lang) => {
    changeLanguage(lang);
    await changeLang({ lang });
  };

  const handleThemeToggle = (checked) => {
    setTheme(checked ? 'dark' : 'light');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" side="bottom" align="end">
        {/* Header */}
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center gap-2">
            <img
              className="w-9 h-9 rounded-full border border-border"
              src={toAbsoluteUrl(
                session?.user?.avatar || '/media/avatars/300-2.png',
              )}
              alt="User avatar"
            />

            <div className="flex flex-col">
              <Link
                href={`/${type}/account/home/get-started`}
                className="text-sm text-mono hover:text-primary font-semibold"
              >
                {session?.user?.name || ''}
              </Link>
              <Link
                href={`/${type}mailto:c.fisher@gmail.com`}
                className="text-xs text-muted-foreground hover:text-primary"
              >
                {session?.user?.email || ''}
              </Link>
            </div>
          </div>
        </div>

        <DropdownMenuSeparator />

        {/* Menu Items */}
        <DropdownMenuItem asChild>
          <Link href={`/${type}/profile`} className="flex items-center gap-2">
            <User />
            {t('myProfile')}
          </Link>
        </DropdownMenuItem>

        {/* Language Submenu with Radio Group */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="flex items-center gap-2 [&_[data-slot=dropdown-menu-sub-trigger-indicator]]:hidden hover:[&_[data-slot=badge]]:border-input data-[state=open]:[&_[data-slot=badge]]:border-input">
            <Globe />
            <span className="flex items-center justify-between gap-2 grow relative">
              {t('language')}
              <Badge
                appearance="stroke"
                className="absolute end-0 top-1/2 -translate-y-1/2"
              >
                {language.name}
                <img
                  src={language.flag}
                  className="w-3.5 h-3.5 rounded-full"
                  alt={language.name}
                />
              </Badge>
            </span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-48">
            <DropdownMenuRadioGroup
              value={language.code}
              onValueChange={handleLanguage}
            >
              {I18N_LANGUAGES.map((item) => (
                <DropdownMenuRadioItem
                  key={item.code}
                  value={item.code}
                  className="flex items-center gap-2"
                >
                  <img
                    src={item.flag}
                    className="w-4 h-4 rounded-full"
                    alt={item.name}
                  />

                  <span>{item.name}</span>
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator />

        {/* Footer */}
        <DropdownMenuItem
          className="flex items-center gap-2"
          onSelect={(event) => event.preventDefault()}
        >
          <Moon />
          <div className="flex items-center gap-2 justify-between grow">
            {t('darkMode')}
            <Switch
              size="sm"
              checked={theme === 'dark'}
              onCheckedChange={handleThemeToggle}
            />
          </div>
        </DropdownMenuItem>
        <div className="p-2 mt-1">
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => signout()}
          >
            {t('logout')}
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

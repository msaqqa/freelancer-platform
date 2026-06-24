'use client';

import { I18N_LANGUAGES } from '@/i18n/config';
import { Globe, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useLanguage } from '@/providers/i18n-provider';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Switch, SwitchIndicator, SwitchWrapper } from '@/components/ui/switch';

export function AuthSwitchers() {
  const { changeLanguage, language } = useLanguage();
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="flex items-center gap-4">
      {/* Language Switcher */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            <img
              src={language.flag}
              className="w-4 h-4 rounded-full"
              alt={language.name}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {I18N_LANGUAGES.map((item) => (
            <DropdownMenuItem
              key={item.code}
              onClick={() => changeLanguage(item.code)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <img
                src={item.flag}
                className="w-4 h-4 rounded-full"
                alt={item.name}
              />
              <span>{item.name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Theme Switcher */}
      <SwitchWrapper className="items-center">
        <Switch
          checked={isDark}
          onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
          className="h-8 w-14 bg-slate-200 data-[state=checked]:bg-slate-800"
          size="lg"
          variant="primary"
        >
          <SwitchIndicator
            state={isDark ? 'on' : 'off'}
            className="text-primary-foreground"
          >
            {isDark ? (
              <Moon className="w-4 h-4" aria-hidden="true" />
            ) : (
              <Sun className="w-4 h-4" aria-hidden="true" />
            )}
          </SwitchIndicator>
        </Switch>
      </SwitchWrapper>
    </div>
  );
}

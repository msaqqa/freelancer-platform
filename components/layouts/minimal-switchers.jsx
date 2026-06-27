'use client';

import { I18N_LANGUAGES } from '@/i18n/config';
import { Globe, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/providers/i18n-provider';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Language + theme controls shared by the auth and onboarding (new-user)
// minimal layouts.
export function MinimalSwitchers() {
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
      <div
        role="radiogroup"
        aria-label="Toggle theme"
        className="inline-flex items-center gap-1 rounded-full bg-muted p-1"
      >
        <button
          type="button"
          role="radio"
          aria-checked={!isDark}
          aria-label="Light mode"
          onClick={() => setTheme('light')}
          className={cn(
            'grid size-7 place-items-center rounded-full transition-colors',
            !isDark
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          <Sun className="w-4 h-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          role="radio"
          aria-checked={isDark}
          aria-label="Dark mode"
          onClick={() => setTheme('dark')}
          className={cn(
            'grid size-7 place-items-center rounded-full transition-colors',
            isDark
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          <Moon className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

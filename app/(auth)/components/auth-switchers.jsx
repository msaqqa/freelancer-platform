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

export function AuthSwitchers() {
  const { changeLanguage, language } = useLanguage();
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-2">
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
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="p-2"
      >
        {theme === 'dark' ? (
          <Sun className="w-4 h-4" />
        ) : (
          <Moon className="w-4 h-4" />
        )}
      </Button>
    </div>
  );
}

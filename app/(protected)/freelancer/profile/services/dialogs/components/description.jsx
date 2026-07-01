'use client';

import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RichTextEditor } from './rich-text-editor';

const MIN_CHARS = 10;
const MAX_CHARS = 4000;

// Length of the plain text inside the editor HTML.
const textLength = (html) => {
  if (typeof document === 'undefined' || !html) return 0;
  const el = document.createElement('div');
  el.innerHTML = html;
  return (el.textContent || '').trim().length;
};

export const Description = () => {
  const form = useFormContext();
  const { t } = useTranslation('services');

  return (
    <>
      <p className="text-md text-foreground font-semibold mb-5">
        {t('description.title')}
      </p>

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => {
          const count = textLength(field.value);
          return (
            <FormItem className="w-full">
              <FormLabel>{t('description.summaryLabel')}</FormLabel>
              <p className="text-sm text-muted-foreground -mt-1 mb-2">
                {t('description.summaryDesc')}
              </p>
              <FormControl>
                <RichTextEditor
                  value={field.value}
                  onChange={field.onChange}
                  placeholder={t('description.summaryHolder')}
                />
              </FormControl>
              {/* Error + counter share one line on sm+, stack on mobile. */}
              <div className="flex flex-col gap-1 pt-1.5 sm:flex-row sm:items-center">
                <FormMessage className="mt-0" />
                <span className="text-xs text-muted-foreground ms-auto">
                  {t('description.counter', {
                    min: MIN_CHARS,
                    max: MAX_CHARS,
                    count,
                  })}
                </span>
              </div>
            </FormItem>
          );
        }}
      />
    </>
  );
};

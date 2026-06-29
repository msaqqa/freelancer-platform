'use client';

import { useFormContext } from 'react-hook-form';
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

  return (
    <>
      <p className="text-md text-foreground font-semibold mb-5">
        Service description
      </p>

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => {
          const count = textLength(field.value);
          return (
            <FormItem className="w-full">
              <FormLabel>Service summary</FormLabel>
              <p className="text-sm text-muted-foreground -mt-1 mb-2">
                Highlight what makes your service or project unique and valuable
                to clients.
              </p>
              <FormControl>
                <RichTextEditor
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Write a short summary..."
                />
              </FormControl>
              <div className="flex justify-end pt-1.5">
                <span className="text-xs text-muted-foreground">
                  Min. {MIN_CHARS}, max. {MAX_CHARS} chars — {count}/{MAX_CHARS}
                </span>
              </div>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </>
  );
};

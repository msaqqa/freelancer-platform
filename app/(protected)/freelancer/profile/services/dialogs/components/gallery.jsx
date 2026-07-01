'use client';

import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { GalleryInput } from '.';

const Gallery = () => {
  const form = useFormContext();
  const { t } = useTranslation('services');

  return (
    <>
      <p className="text-md text-foreground font-semibold mb-5">
        {t('gallery.title')}
      </p>
      {/* Gallery Photos */}
      <FormField
        control={form.control}
        name="images"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="mb-2">{t('gallery.imagesLabel')}</FormLabel>
            <FormDescription className="mb-2">
              {t('gallery.imagesDesc')}
            </FormDescription>
            <FormControl>
              <GalleryInput
                {...field}
                multiple={true}
                onChange={(val) => {
                  field.onChange(val);
                  form.trigger('images');
                }}
                // imagesUrls={summary?.images_urls}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default Gallery;

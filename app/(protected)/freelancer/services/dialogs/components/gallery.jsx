'use client';

import { useFormContext } from 'react-hook-form';
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

  return (
    <>
      <p className="text-md text-foreground font-semibold mb-5">
        Requirements and steps
      </p>
      {/* Gallery Photos */}
      <FormField
        control={form.control}
        name="images"
        render={(field) => (
          <FormItem>
            <FormLabel className="mb-2">Project Images</FormLabel>
            <FormDescription className="mb-2">
              Upload up to 20 images (.jpg or .png), up to 10MB each and less
              than 4,000 pixels, in width or height.
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

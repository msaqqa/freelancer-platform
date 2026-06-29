'use client';

import { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { toAbsoluteUrl } from '@/lib/helpers';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ImageInput } from '@/components/image-input';

// Render a preview source as-is for blob/data/remote/absolute paths; only
// legacy relative asset names get the media prefix.
const previewSrc = (src) =>
  typeof src === 'string' && /^(blob:|data:|https?:|\/)/.test(src)
    ? src
    : toAbsoluteUrl(src);

export function MediaButton({
  title,
  description,
  instructions,
  variant,
  value,
  invalid,
  onChange,
}) {
  const [media, setMedia] = useState([]);

  // Seed the preview from an existing value (e.g. a stored URL in edit mode).
  // A File value means the user just picked a file — keep the local preview.
  useEffect(() => {
    if (typeof value === 'string' && value) {
      setMedia([{ dataURL: value, file: value }]);
    } else if (!value) {
      setMedia([]);
    }
  }, [value]);

  const handleImageUpload = (selectedImage) => {
    setMedia(selectedImage);
    onChange(selectedImage.length > 0 ? selectedImage[0].file : '');
  };

  return (
    <ImageInput value={media} onChange={handleImageUpload}>
      {({ fileList, onImageUpload, onImageRemove }) => (
        <div className="bg-background">
          {fileList.length === 0 ? (
            <div
              className={cn(
                'w-full h-[300px] flex flex-col justify-center items-center bg-muted text-foreground border-2 border-dashed rounded-xl py-12',
                invalid ? 'border-destructive' : 'border-input',
              )}
            >
              <div className="w-full flex flex-col gap-6">
                <div className="flex flex-col gap-5 text-center">
                  {title && (
                    <h2 className="text-lg font-semibold text-mono">{title}</h2>
                  )}
                  {description && (
                    <p className="text-sm text-foreground">{description}</p>
                  )}
                </div>
                <div className="flex justify-center">
                  <Button
                    variant={variant}
                    size="lg"
                    onClick={onImageUpload}
                    className="w-60"
                    type="button"
                  >
                    Upload Media
                  </Button>
                </div>
                {instructions && (
                  <ul className="w-full flex flex-col md:flex-row items-center md:justify-evenly gap-2.5 list-disc text-xs text-muted-foreground">
                    {instructions.map((item) => (
                      <li className="mb-2">{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ) : (
            fileList.length > 0 &&
            fileList.map((file, index) => (
              <div
                key={index}
                className="relative bg-muted rounded-xl w-full h-[300px] overflow-hidden"
              >
                <img
                  src={previewSrc(file.dataURL)}
                  alt={`Uploaded Image ${index}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                <Button
                  variant="outline"
                  mode="icon"
                  onClick={() => onImageRemove(index)}
                  className="w-6.5 h-6.5 rounded-full absolute top-2 right-2"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            ))
          )}
        </div>
      )}
    </ImageInput>
  );
}

'use client';

import { useRef, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { ImageInput } from '@/components/image-input';

export function GalleryInput({ onChange, multiple = false }) {
  const [gallery, setGallery] = useState([]);
  const navBar2 = useRef(null);

  const handleImageUpload = (selectedImages) => {
    setGallery(selectedImages);
    if (multiple) {
      if (selectedImages.length > 0) {
        const files = selectedImages.map((image) => image.file);
        onChange(files);
      }
    } else {
      if (selectedImages.length > 0) {
        onChange(selectedImages[0].file);
      }
    }
  };

  return (
    <ImageInput
      value={gallery}
      multiple={multiple}
      onChange={handleImageUpload}
    >
      {({ fileList, onImageUpload, onImageRemove }) => {
        const checkImage = multiple ? true : !fileList.length;
        return (
          <div className="flex justify-start gap-3 bg-background">
            {checkImage && (
              <div
                className={`pb-2 flex flex-col shrink-0 justify-center items-center bg-muted text-foreground border-2 border-dashed border-input rounded-xl p-6 ${multiple ? 'w-[160px]' : 'w-full'} h-[200px] cursor-pointer`}
                onClick={onImageUpload}
              >
                <img
                  src={toAbsoluteUrl('/media/icons/gallery-light.svg')}
                  alt="Add Image"
                  className="dark:hidden mx-auto mb-4"
                />
                <img
                  src={toAbsoluteUrl('/media/icons/gallery-dark.svg')}
                  alt="Add Image"
                  className="light:hidden mx-auto mb-4"
                />
                <div className="text-sm font-medium mb-2">Add photos</div>
                <ul
                  className={`flex w-full ${multiple ? 'flex-col justify-center' : 'list-disc flex-row justify-around'} text-center text-xs`}
                >
                  <li className="mb-2">1080×1350 px</li> <br />
                  <li>(Max 6 images)</li>
                </ul>
              </div>
            )}
            <ScrollArea viewportRef={navBar2} className="w-full pb-2 mb-4">
              <div
                className="flex-1 flex items-center gap-3 pb-2"
                style={multiple ? { width: 'calc(var(--spacing) * 94)' } : null}
              >
                {fileList.map((file, index) => (
                  <div
                    key={index}
                    className={`relative flex flex-col justify-center items-center bg-muted rounded-xl shrink-0 ${multiple ? 'w-[160px]' : 'w-full'} h-[200px]`}
                  >
                    <img
                      src={toAbsoluteUrl(file.dataURL)}
                      alt={`Uploaded Image ${index}`}
                      className="gallery-image w-full h-full object-cover rounded-lg"
                    />
                    <Button
                      variant="ghost"
                      mode="icon"
                      onClick={() => onImageRemove(index)}
                      className="bg-muted w-6.5 h-6.5 rounded-full absolute top-2 right-2"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                ))}
              </div>
              <ScrollBar className="w-full" orientation="horizontal" />
            </ScrollArea>
          </div>
        );
      }}
    </ImageInput>
  );
}

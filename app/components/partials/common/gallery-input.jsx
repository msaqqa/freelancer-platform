'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Button } from '@/components/ui/button';
import { ImageInput } from '@/components/image-input';

export function GalleryInput({ multiple }) {
  const [gallery, setGallery] = useState([]);

  const handleImageUpload = (selectedImages) => {
    setGallery(selectedImages);
  };

  return (
    <ImageInput
      value={gallery}
      multiple={multiple}
      onChange={handleImageUpload}
    >
      {({ fileList, onImageUpload, onImageRemove }) => (
        <div className="flex justify-start gap-2.5 bg-background">
          <div
            className={`pb-2 flex flex-col shrink-0 justify-center items-center bg-muted text-foreground border-2 border-dashed border-input rounded-xl p-6 ${multiple ? 'w-[160px]' : fileList.length ? 'w-1/2' : 'w-full'} h-[200px] cursor-pointer`}
            onClick={onImageUpload}
          >
            <img
              src={toAbsoluteUrl('/media/file-types/gallery-add.svg')}
              alt="Add photos"
              className="mx-auto mb-4"
            />
            <div className="text-sm font-medium mb-2">Add photos</div>
            <ul
              className={`flex w-full ${multiple ? 'flex-col justify-center' : 'list-disc flex-row justify-around'} text-center text-xs`}
            >
              <li className="mb-2">1080×1350 px</li> <br />
              <li>(Max 6 images)</li>
            </ul>
          </div>
          <div className="flex gap-5 kt-scrollable-x pb-2">
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
        </div>
      )}
    </ImageInput>
  );
}

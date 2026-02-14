'use client';

import { useState } from 'react';
import { RiCheckboxCircleFill } from '@remixicon/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { toAbsoluteUrl } from '@/lib/helpers';
import { deleteFreelancerImage } from '@/services/freelancer/profile';
import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { ImageInput } from '@/components/image-input';

export function GalleryInput({ multiple = false, onChange, imagesUrls = [] }) {
  const [gallery, setGallery] = useState([]);
  const { t } = useTranslation('freelancerProfile');
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteFreelancerImage,
    onSuccess: (data) => {
      toast.custom(
        () => (
          <Alert variant="mono" icon="success">
            <AlertIcon>
              <RiCheckboxCircleFill />
            </AlertIcon>
            <AlertTitle>{data?.message}</AlertTitle>
          </Alert>
        ),
        {
          position: 'top-center',
        },
      );
      queryClient.invalidateQueries({ queryKey: ['freelancer-summary'] });
    },
  });

  const handleRemoveImage = (imageId) => {
    mutation.mutate(imageId);
  };

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
        return (
          <div className="w-full flex justify-start gap-4">
            <div
              className={`flex flex-col shrink-0 justify-center items-center bg-accent text-foreground border-2 border-dashed border-input rounded-xl p-6 w-1/3 h-[200px] cursor-pointer`}
              onClick={onImageUpload}
            >
              <img
                src={toAbsoluteUrl('/media/icons/gallery-light.svg')}
                alt="Add Image"
                className="inline-block dark:hidden mx-auto mb-2"
                MaxImages
              />
              <img
                src={toAbsoluteUrl('/media/icons/gallery-dark.svg')}
                alt="Add Image"
                className="inline-block light:hidden mx-auto mb-2"
              />
              <div className="text-sm font-medium text-foreground mb-2">
                Drag image here or
              </div>
              <div className="text-sm font-medium text-primary">
                {t('AddPhoto')}
              </div>
            </div>

            {fileList.map((file, index) => (
              <div key={index} className={`relative w-1/3 h-[200px]`}>
                <img
                  src={toAbsoluteUrl(file.dataURL)}
                  alt={`Uploaded Image ${index}`}
                  className={`gallery-image w-full h-full object-cover rounded-lg`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  mode="icon"
                  onClick={() => onImageRemove(index)}
                  className="bg-muted w-6.5 h-6.5 rounded-full absolute top-2 right-2"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            ))}
            {imagesUrls.length > 0 &&
              imagesUrls.map((file) => (
                <div
                  key={file.id}
                  className={`relative flex flex-col justify-center items-center bg-accent rounded-xl shrink-0 w-1/3 h-[200px]`}
                >
                  <img
                    src={toAbsoluteUrl(file.url)}
                    alt={`Uploaded Image ${file.id}`}
                    className="gallery-image w-full h-full object-cover rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    mode="icon"
                    onClick={() => handleRemoveImage(file.id)}
                    className="bg-muted w-6.5 h-6.5 rounded-full absolute top-2 right-2"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              ))}
          </div>
        );
      }}
    </ImageInput>
  );
}

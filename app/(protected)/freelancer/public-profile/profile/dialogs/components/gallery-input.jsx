'use client';

import { useRef, useState } from 'react';
import { RiCheckboxCircleFill, RiErrorWarningFill } from '@remixicon/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { toAbsoluteUrl } from '@/lib/helpers';
import { deleteFreelancerImage } from '@/services/freelancer/profile';
import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { ImageInput } from '@/components/image-input';

export function GalleryInput({ multiple = false, onChange, imagesUrls = [] }) {
  const [gallery, setGallery] = useState([]);
  const navBar = useRef(null);
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
    onError: (error) => {
      toast.custom(
        () => (
          <Alert variant="mono" icon="destructive">
            <AlertIcon>
              <RiErrorWarningFill />
            </AlertIcon>
            <AlertTitle>{error.message}</AlertTitle>
          </Alert>
        ),

        {
          position: 'top-center',
        },
      );
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
        const checkImage = multiple ? true : !fileList.length;
        return (
          <div className="flex justify-start gap-3 bg-background">
            {checkImage && (
              <div
                className={`pb-2 flex flex-col shrink-0 justify-center items-center bg-muted text-foreground border-2 border-dashed border-input rounded-xl p-6 ${multiple ? 'w-[160px] h-[200px]' : 'w-full h-[300px]'} cursor-pointer`}
                onClick={onImageUpload}
              >
                <img
                  src={toAbsoluteUrl('/media/icons/gallery-light.svg')}
                  alt="Add Image"
                  className="dark:hidden mx-auto"
                  MaxImages
                />
                <img
                  src={toAbsoluteUrl('/media/icons/gallery-dark.svg')}
                  alt="Add Image"
                  className="light:hidden mx-auto"
                />
                <div className="text-sm font-medium mb-2">{t('AddPhoto')}</div>
                <ul
                  className={`flex w-full ${multiple ? 'flex-col justify-center' : 'list-disc flex-row justify-around'} text-center text-xs`}
                >
                  <li className="mb-2">
                    {multiple ? t('addPhotos') : t('addID')}
                  </li>{' '}
                  <br />
                  <li>({multiple ? t('maxImages') : t('imageType')})</li>
                </ul>
              </div>
            )}
            <ScrollArea
              viewportRef={navBar}
              className="w-full overflow-x-auto pb-2"
            >
              <div
                className="flex-1 flex items-center gap-3 pb-2"
                style={
                  multiple
                    ? { width: 'calc(var(--spacing) * 88)' }
                    : { width: '100%' }
                }
              >
                {fileList.map((file, index) => (
                  <div
                    key={index}
                    className={`relative flex flex-col justify-center items-center bg-muted rounded-xl shrink-0 ${multiple ? 'w-[160px] h-[200px]' : 'w-full h-[300px]'}`}
                  >
                    <img
                      src={toAbsoluteUrl(file.dataURL)}
                      alt={`Uploaded Image ${index}`}
                      className={`gallery-image w-full h-full ${multiple ? 'object-cover' : 'object-contain'} rounded-lg`}
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
                      className={`relative flex flex-col justify-center items-center bg-muted rounded-xl shrink-0 ${multiple ? 'w-[160px]' : 'w-full'} h-[200px]`}
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
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        );
      }}
    </ImageInput>
  );
}

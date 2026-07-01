'use client';

import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

const ServiceViewDialog = ({ open, closeDialog, service }) => {
  const { t } = useTranslation('services');
  const images = service?.images ?? [];
  const skills = service?.skills ?? [];

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent
        variant="fullscreen"
        className="w-full max-w-[800px] mx-auto"
      >
        <DialogHeader className="pb-5 border-b border-border">
          <DialogTitle>{t('view.viewTitle')}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="grow pe-3 -me-3">
          <h2 className="text-lg text-foreground font-semibold mb-5">
            {service?.title}
          </h2>

          {images.map((url, index) => (
            <div
              key={index}
              className="bg-muted rounded-xl w-full h-[300px] overflow-hidden mb-5"
            >
              <img
                src={url}
                alt="image"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}

          {service?.description && (
            <div className="flex flex-col gap-2.5 mb-5">
              <span className="text-base font-semibold text-mono">
                {t('view.description')}
              </span>
              <div
                className="text-sm text-foreground prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: service.description }}
              />
            </div>
          )}

          <div className="flex flex-wrap gap-6 mb-5">
            {service?.price != null && (
              <div className="flex flex-col gap-1">
                <span className="text-base font-semibold text-mono">
                  {t('view.price')}
                </span>
                <span className="text-sm text-foreground">
                  ${service.price}
                </span>
              </div>
            )}
            {service?.delivery_days != null && (
              <div className="flex flex-col gap-1">
                <span className="text-base font-semibold text-mono">
                  {t('view.delivery')}
                </span>
                <span className="text-sm text-foreground">
                  {t('view.deliveryValue', { days: service.delivery_days })}
                </span>
              </div>
            )}
          </div>

          {skills.length > 0 && (
            <div className="flex flex-col gap-2.5">
              <span className="text-base font-semibold text-mono">
                {t('view.skills')}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill) => (
                  <Badge key={skill.id} variant="secondary">
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </ScrollArea>
        <DialogFooter>
          <Button variant="outline" onClick={closeDialog}>
            {t('cancelBtn')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceViewDialog;

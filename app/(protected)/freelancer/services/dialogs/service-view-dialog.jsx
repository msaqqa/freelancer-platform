'use client';

import { toAbsoluteUrl } from '@/lib/helpers';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tags } from '../components';

const ServiceViewDialog = ({ open, closeDialog }) => {
  const service = {
    title: 'E-commerce Landing Page - Cartique',
    fields: [
      { type: 'image', value: '/media/images/600x400/3.jpg' },
      { type: 'text', value: 'Available for the new service' },
      { type: 'image', value: '/media/images/600x400/25.jpg' },
      { type: 'text', value: 'Available for the new service' },
    ],
    details: 'Posted Jun 10, 2025',
    tags: [
      { label: 'Web Design' },
      { label: 'Code Review' },
      { label: 'Figma' },
      { label: 'Product Development' },
      { label: 'Webflow' },
      { label: 'AI' },
      { label: 'noCode' },
      { label: 'Management' },
    ],
  };

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent
        variant="fullscreen"
        className="w-full max-w-[800px] mx-auto"
      >
        <DialogHeader className="pb-5 border-b border-border">
          <DialogTitle>View service</DialogTitle>
        </DialogHeader>
        <ScrollArea className="grow pe-3 -me-3">
          <h2 className="text-lg text-foreground font-semibold mb-5">
            {service?.title}
          </h2>
          {service?.fields.map((field) => (
            <div key={field.id} className="relative mb-5">
              {field.type === 'text' ? (
                <p className="text-sm text-foreground mb-5">{field?.value}</p>
              ) : (
                <div className="bg-muted rounded-xl w-full h-[300px] overflow-hidden mb-5">
                  <img
                    src={toAbsoluteUrl(field?.value)}
                    alt="image"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
          ))}
          <div className="flex flex-col gap-2.5 mb-5">
            <span className="text-base font-semibold text-mono">Details</span>
            <span className="text-sm font-normal text-foreground">
              {service?.details}
            </span>
          </div>
          <div className="flex flex-col gap-2.5">
            <span className="text-base font-semibold text-mono">Tags</span>
            <Tags tags={service?.tags} />
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button variant="outline" onClick={closeDialog}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceViewDialog;

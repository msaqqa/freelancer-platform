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

// "MM-YYYY" -> "MM/YYYY" (locale-neutral).
const fmt = (date) => (date ? date.replace('-', '/') : '');

const ExperienceViewDialog = ({ open, closeDialog, experience }) => {
  const { t } = useTranslation('freelancerExperience');
  const exp = experience ?? {};

  const meta = [exp.company, exp.location].filter(Boolean).join(' · ');
  const range = `${fmt(exp.start_date)} - ${
    exp.end_date ? fmt(exp.end_date) : t('present')
  }`;

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent variant="fullscreen" className="w-full max-w-[600px] mx-auto">
        <DialogHeader className="pb-5 border-b border-border">
          <DialogTitle>{t('view.viewTitle')}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="grow pe-3 -me-3">
          <h2 className="text-lg text-foreground font-semibold">{exp.title}</h2>
          {meta && (
            <p className="text-sm text-secondary-foreground mt-1">{meta}</p>
          )}

          <div className="flex flex-col gap-5 mt-5">
            <div className="flex flex-col gap-1">
              <span className="text-base font-semibold text-mono">
                {t('view.duration')}
              </span>
              <span className="text-sm text-foreground">{range}</span>
            </div>

            {exp.type && (
              <div className="flex flex-col gap-1.5">
                <span className="text-base font-semibold text-mono">
                  {t('dialog.typeLabel')}
                </span>
                <div>
                  <Badge variant="secondary">{t(`types.${exp.type}`)}</Badge>
                </div>
              </div>
            )}

            {exp.description && (
              <div className="flex flex-col gap-1">
                <span className="text-base font-semibold text-mono">
                  {t('dialog.descriptionLabel')}
                </span>
                <p className="text-sm text-foreground">{exp.description}</p>
              </div>
            )}
          </div>
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

export default ExperienceViewDialog;

'use client';

import { useTranslation } from 'react-i18next';
import { formatDate } from '@/lib/helpers';
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

const ProjectViewDialog = ({ open, closeDialog, project }) => {
  const { t } = useTranslation('portfolio');
  const blocks = project?.content_blocks ?? [];
  const skills = project?.skills ?? [];

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
            {project?.title}
          </h2>

          {blocks.map((field, index) => (
            <div key={index} className="relative mb-5">
              {field.type === 'text' ? (
                <p className="text-sm text-foreground mb-5">{field?.value}</p>
              ) : (
                <div className="bg-muted rounded-xl w-full h-[300px] overflow-hidden mb-5">
                  <img
                    src={field?.url}
                    alt="image"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
          ))}

          {project?.created_at && (
            <div className="flex flex-col gap-2.5 mb-5">
              <span className="text-base font-semibold text-mono">
                {t('view.details')}
              </span>
              <span className="text-sm font-normal text-foreground">
                {t('view.posted')} {formatDate(project.created_at)}
              </span>
            </div>
          )}

          {skills.length > 0 && (
            <div className="flex flex-col gap-2.5 mb-5">
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

export default ProjectViewDialog;

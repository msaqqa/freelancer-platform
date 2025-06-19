'use client';

import { Plus } from 'lucide-react';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Button } from '@/components/ui/button';

export const EmptyState = ({
  title,
  description,
  icon,
  openDialog,
  button = true,
}) => {
  console.log('button', button);
  return (
    <div className="grid place-items-center gap-4">
      <div className="flex justify-center items-center">
        <img src={toAbsoluteUrl(icon)} className="max-h-[50px]" alt="image" />
      </div>

      <div className="text-sm text-foreground text-center">{description}</div>

      {button && (
        <Button
          className="text-blue-500 hover:text-blue-600"
          type="button"
          variant="dim"
          onClick={openDialog}
        >
          <span className="p-px border border-blue-500 group-hover:border-blue-600 rounded-md">
            <Plus size={16} />
          </span>
          Add New {title}
        </Button>
      )}
    </div>
  );
};

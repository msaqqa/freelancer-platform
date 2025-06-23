'use client';

import { useState } from 'react';
import { SquarePen } from 'lucide-react';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { SammaryDialog } from '../dialogs/sammary-dialog';
import { EmptyState } from './empty-state';

const Summary = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const summary = null;

  const items = [];

  const renderItem = (item, index) => {
    return (
      <div
        key={index}
        className="bg-cover bg-no-repeat min-h-[340px] min-w-[250px] rounded-xl"
        style={{
          backgroundImage: `url(${toAbsoluteUrl(item)})`,
        }}
      ></div>
    );
  };

  return (
    <Card>
      <CardHeader className="border-b-0">
        <CardTitle>Summary</CardTitle>
        {summary && (
          <Button
            variant="ghost"
            mode="icon"
            onClick={() => setOpenDialog(true)}
          >
            <SquarePen size={16} className="text-blue-500" />
          </Button>
        )}
      </CardHeader>

      <div className="grid gap-5 mb-5 px-7.5">
        {summary ? (
          <>
            <p className="text-sm text-foreground leading-5.5">
              Now that I’m done thoroughly mangling that vague metaphor, let’s
              get down to business. You know you need to start blogging to grow
              your business, but you don’t know how. In this post, I’ll show you
              how to write a great blog post in five simple steps that people
              will actually want to read. Ready? Let’s get started.
            </p>
            {items.length > 0 && (
              <div className="flex gap-2.5 xl:gap-7.5 kt-scrollable-x overflow-x-auto pb-2">
                {items.map((item, index) => {
                  return renderItem(item, index);
                })}
              </div>
            )}
          </>
        ) : (
          <EmptyState
            title="Summary"
            description="Add a short bio, showcase your work with photos, and introduce yourself in a short video."
            icon="/media/icons/summary-icon.svg"
            openDialog={() => setOpenDialog(true)}
          />
        )}
      </div>

      <SammaryDialog
        open={openDialog}
        closeDialog={() => setOpenDialog(false)}
      />
    </Card>
  );
};

export { Summary };

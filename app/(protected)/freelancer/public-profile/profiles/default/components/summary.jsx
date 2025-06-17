'use client';

import { useState } from 'react';
import { SquarePen } from 'lucide-react';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { SammaryDialog } from '../dialogs/sammary-dialog';

const Summary = () => {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <Card>
      <CardHeader className="border-b-0">
        <CardTitle>Summary</CardTitle>
        <Button variant="ghost" mode="icon" onClick={() => setOpenDialog(true)}>
          <SquarePen size={16} className="text-blue-500" />
        </Button>
      </CardHeader>

      <div className="grid gap-5 mb-5 px-7.5">
        <p className="text-sm text-foreground leading-5.5">
          Now that I’m done thoroughly mangling that vague metaphor, let’s get
          down to business. You know you need to start blogging to grow your
          business, but you don’t know how. In this post, I’ll show you how to
          write a great blog post in five simple steps that people will actually
          want to read. Ready? Let’s get started.
        </p>
        <div className="grid grid-cols-2 gap-2.5 xl:gap-7.5">
          <div>
            <div
              className="bg-cover bg-no-repeat min-h-[340px] w-full rounded-xl"
              style={{
                backgroundImage: `url(${toAbsoluteUrl(`/media/images/600x600//21.jpg`)})`,
              }}
            ></div>
          </div>
          <div className="grid grid-rows-2 gap-2.5 xl:gap-7.5">
            <div>
              <div
                className="bg-cover bg-no-repeat rounded-xl h-full w-full"
                style={{
                  backgroundImage: `url(${toAbsoluteUrl(`/media/images/600x400/19.jpg`)})`,
                }}
              ></div>
            </div>
            <div>
              <div
                className="bg-cover bg-no-repeat rounded-xl h-full w-full"
                style={{
                  backgroundImage: `url(${toAbsoluteUrl(`/media/images/600x400/20.jpg`)})`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      <SammaryDialog
        open={openDialog}
        closeDialog={() => setOpenDialog(false)}
      />
    </Card>
  );
};

export { Summary };

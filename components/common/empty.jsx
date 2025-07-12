'use client';

import { Fragment } from 'react';
import { Plus } from 'lucide-react';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Empty = ({ image, title, decription, openDialog, button = true }) => {
  return (
    <Fragment>
      <Card className="p-8 lg:p-12">
        <CardContent>
          <div className="grid justify-center py-5">
            <img
              src={toAbsoluteUrl(image)}
              className="dark:hidden max-h-[170px]"
              alt="image"
            />

            <img
              src={toAbsoluteUrl('/media/illustrations/11-dark.svg')}
              className="light:hidden max-h-[170px]"
              alt="image"
            />
          </div>
          {/* <div className="text-lg font-medium text-mono text-center">
            {title}
          </div> */}
          <div className="text-sm text-secondary-foreground text-center gap-1 mb-5">
            {decription}
          </div>
          {button && (
            <div className="flex justify-center">
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
            </div>
          )}
        </CardContent>
      </Card>
    </Fragment>
  );
};

export { Empty };

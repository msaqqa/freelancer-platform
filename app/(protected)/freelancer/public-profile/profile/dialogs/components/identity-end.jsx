'use client';

import { toAbsoluteUrl } from '@/lib/helpers';
import { Button } from '@/components/ui/button';

export const IdentityEnd = ({ closeDialog }) => {
  return (
    <div className="h-full flex flex-col justify-center gap-2.5 ">
      <div className="flex flex-col justify-center mb-5">
        <img
          src={toAbsoluteUrl('/media/illustrations/43.svg')}
          className="dark:hidden max-h-[140px]"
          alt="image"
        />

        <img
          src={toAbsoluteUrl('/media/illustrations/43-dark.svg')}
          className="light:hidden max-h-[140px]"
          alt="image"
        />
      </div>

      <div className="flex flex-col items-center gap-y-2.5 w-full md:w-[70%] mx-auto mb-5">
        <h2 className="text-xl font-semibold text-mono">You’re all set!</h2>
        <p className="text-sm text-secondary-foreground leading-5.5 text-center">
          Verification is under review. This may take up to 24 hours.
        </p>
      </div>

      <div className="flex justify-center">
        <Button
          type="button"
          variant="mono"
          size="lg"
          className="w-1/2"
          onClick={closeDialog}
        >
          Back to Profile
        </Button>
      </div>
    </div>
  );
};

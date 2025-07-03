'use client';

import { toAbsoluteUrl } from '@/lib/helpers';
import { Button } from '@/components/ui/button';

export const IdentityStart = ({ handleNextStep, t }) => {
  return (
    <div className="h-full flex flex-col justify-center gap-2.5">
      <div className="flex flex-col justify-center mb-5">
        <img
          src={toAbsoluteUrl('/media/illustrations/42.svg')}
          className="dark:hidden max-h-[140px]"
          alt="image"
        />

        <img
          src={toAbsoluteUrl('/media/illustrations/42-dark.svg')}
          className="light:hidden max-h-[140px]"
          alt="image"
        />
      </div>

      <div className="flex flex-col items-center gap-y-2.5 w-full md:w-[80%] mx-auto mb-5">
        <h2 className="text-xl font-semibold text-mono">
          {t('stepStartTitle')}
        </h2>
        <p className="text-sm text-secondary-foreground leading-5.5 text-center">
          {t('stepStartDesc')}
        </p>
      </div>

      <div className="flex justify-center">
        <Button
          type="button"
          size="lg"
          className="w-1/2"
          onClick={handleNextStep}
        >
          {t('stepStartBtn')}
        </Button>
      </div>
    </div>
  );
};

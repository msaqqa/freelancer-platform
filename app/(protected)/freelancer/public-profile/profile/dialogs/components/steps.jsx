'use client';

import { Fragment } from 'react/jsx-runtime';
import { toAbsoluteUrl } from '@/lib/helpers';
import { cn } from '@/lib/utils';

export function Steps({ currentStep, t }) {
  const steps = [
    { title: t('mobileNumber') },
    { title: t('personalData') },
    { title: t('uploadIdPhoto') },
  ];

  return (
    <div className="flex items-center justify-between flex-wrap lg:flex-nowrap gap-8 lg:gap-1.5 pt-5 mb-12">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;
        const state = isCompleted
          ? 'completed'
          : isActive
            ? 'active'
            : 'pending';

        return (
          <Fragment key={step.title}>
            <div
              className={cn(
                'text-2sm leading-none relative flex items-center gap-1.5 text-foreground',
              )}
            >
              {state === 'completed' ? (
                <img
                  src={toAbsoluteUrl('/media/icons/completed.svg')}
                  className="max-h-[140px]"
                  alt="image"
                />
              ) : state === 'active' ? (
                <img
                  src={toAbsoluteUrl('/media/icons/pending.svg')}
                  className="max-h-[140px]"
                  alt="image"
                />
              ) : (
                <img
                  src={toAbsoluteUrl('/media/icons/unselected.svg')}
                  className="max-h-[140px]"
                  alt="image"
                />
              )}
              {step.title}
            </div>

            {index < steps.length - 1 && (
              <div className="hidden lg:block w-12 h-px border-t border-dashed border-zinc-300 dark:border-zinc-600" />
            )}
          </Fragment>
        );
      })}
    </div>
  );
}

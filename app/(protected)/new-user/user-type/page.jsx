'use client';

import { toAbsoluteUrl } from '@/lib/helpers';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function Page() {
  return (
    <div className="flex flex-col items-center pt-10 pb-10">
      <div className="mb-10">
        <img
          src={toAbsoluteUrl('/media/illustrations/21.svg')}
          className="dark:hidden max-h-[140px]"
          alt="image"
        />

        <img
          src={toAbsoluteUrl('/media/illustrations/21-dark.svg')}
          className="light:hidden max-h-[140px]"
          alt="image"
        />
      </div>

      <h3 className="text-lg font-medium text-mono text-center mb-3">
        Welcome To Taqat
      </h3>

      <div className="text-sm text-center text-secondary-foreground mb-7">
        Your Portal To Endless Business Opportunities.
      </div>

      <RadioGroup
        defaultValue="intermediate"
        className="flex flex-col justify-center gap-y-4 mb-2 w-full lg:max-w-[500]"
      >
        <div className="flex justify-between items-center border-1 border-border p-8 rounded-lg">
          <div className="flex items-center gap-4">
            <img
              src={toAbsoluteUrl('/media/illustrations/36.svg')}
              className="h-[60px]"
              alt="image"
            />
            <Label htmlFor={1} variant="primary">
              I Want To Hire New Talent.
            </Label>
          </div>
          <RadioGroupItem value="beginner" id={1} />
        </div>
        <div className="flex justify-between items-center border-1 border-border p-8 rounded-lg">
          <div className="flex items-center gap-4">
            <img
              src={toAbsoluteUrl('/media/illustrations/37.svg')}
              className="h-[60px]"
              alt="image"
            />
            <Label htmlFor={2} variant="primary">
              I Want To Find New Job Opportunities.
            </Label>
          </div>
          <RadioGroupItem
            value="intermediate"
            id={2}
            className="border border-primary"
          />
        </div>
      </RadioGroup>
    </div>
  );
}

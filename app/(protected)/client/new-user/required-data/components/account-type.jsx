'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

const AccoountType = () => {
  const [accountType, setAccoountType] = useState('client');

  return (
    <Card className="pb-2.5">
      <CardHeader id="personal_details">
        <CardTitle>Account Type</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-5">
        <div className="flex flex-col items-center">
          <div className="flex justify-center">
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
          <div className="flex flex-col justify-center gap-y-4 mb-2 w-full lg:max-w-[500px]">
            {/* Option 1 */}
            <div
              onClick={() => setAccoountType('client')}
              className={`flex justify-between items-center p-8 rounded-lg cursor-pointer transition border-2 ${
                accountType === 'client' ? 'border-primary' : 'border-border'
              }`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <img
                    src={toAbsoluteUrl('/media/illustrations/36.svg')}
                    className="h-[60px]"
                    alt="client"
                  />
                  <Label variant="primary">I Want To Hire New Talent.</Label>
                </div>
              </div>
              <div
                className={`h-5 w-5 rounded-full flex items-center justify-center
                    ${accountType === 'client' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-400'}`}
              >
                <Check size={12} strokeWidth={3} />
              </div>
            </div>

            {/* Option 2 */}
            <div
              onClick={() => setAccoountType('freelancer')}
              className={`flex justify-between items-center p-8 rounded-lg cursor-pointer transition border-2 ${
                accountType === 'freelancer'
                  ? 'border-primary'
                  : 'border-border'
              }`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <img
                    src={toAbsoluteUrl('/media/illustrations/37.svg')}
                    className="h-[60px]"
                    alt="freelancer"
                  />
                  <Label variant="primary">
                    I Want To Find New Job Opportunities.
                  </Label>
                </div>
              </div>
              <div
                className={`h-5 w-5 rounded-full flex items-center justify-center
                    ${accountType === 'freelancer' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-400'}`}
              >
                <Check size={12} strokeWidth={3} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2.5">
          <Button>Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export { AccoountType };

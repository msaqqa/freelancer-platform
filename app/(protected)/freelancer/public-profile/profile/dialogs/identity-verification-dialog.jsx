'use client';

import { useEffect, useState } from 'react';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Steps } from '../components/steps';
import { SendOtp, UpdateIdentity, VerifyOtp } from './components';

export const IdentityVerificationDialog = ({ open, closeDialog }) => {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState('');

  useEffect(() => {
    setStep(1);
  }, [open]);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handleBackStep = () => {
    setStep(step - 1);
  };

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent
        className="mx-auto grow w-full max-w-2xl p-0 [&>button]:hidden gap-0"
        variant="fullscreen"
      >
        <DialogHeader className="py-5 px-6 border-b border-border">
          <DialogTitle>Identity Verification</DialogTitle>
        </DialogHeader>
        <ScrollArea className="py-0 mb-5 ps-6 pe-3 me-3 flex-1">
          {step > 1 && step < 6 && <Steps currentStep={step - 2} />}
          {step === 1 && (
            <div className="flex flex-col justify-center gap-2.5">
              <div className="flex flex-col justify-center mb-5">
                <img
                  src={toAbsoluteUrl('/media/illustrations/42.svg')}
                  className="dark:hidden max-h-[140px]"
                  alt="image"
                />

                <img
                  src={toAbsoluteUrl('/media/illustrations/42.svg')}
                  className="light:hidden max-h-[140px]"
                  alt="image"
                />
              </div>

              <div className="flex flex-col items-center gap-y-2.5 w-full md:w-[70%] mx-auto mb-5">
                <h2 className="text-xl font-semibold text-mono">
                  Verify Your Identity
                </h2>
                <p className="text-sm text-secondary-foreground leading-5.5 text-center">
                  Verifying your identity helps unlock full platform access and
                  shows clients you're a trusted professional.
                </p>
              </div>

              <div className="flex justify-center">
                <Button
                  type="button"
                  size="lg"
                  className="w-1/2"
                  onClick={handleNextStep}
                >
                  Get Started
                </Button>
              </div>
            </div>
          )}
          {step === 2 && (
            <SendOtp
              handleNextStep={handleNextStep}
              handleBackStep={handleBackStep}
              setMobile={setMobile}
            />
          )}
          {step === 3 && (
            <VerifyOtp
              handleNextStep={handleNextStep}
              handleBackStep={handleBackStep}
              mobile={mobile}
            />
          )}
          <UpdateIdentity
            step={step}
            handleNextStep={handleNextStep}
            handleBackStep={handleBackStep}
          />
          {step === 6 && (
            <div className="flex flex-col justify-center gap-2.5 ">
              <div className="flex flex-col justify-center mb-5">
                <img
                  src={toAbsoluteUrl('/media/illustrations/43.svg')}
                  className="dark:hidden max-h-[140px]"
                  alt="image"
                />

                <img
                  src={toAbsoluteUrl('/media/illustrations/43.svg')}
                  className="light:hidden max-h-[140px]"
                  alt="image"
                />
              </div>

              <div className="flex flex-col items-center gap-y-2.5 w-full md:w-[70%] mx-auto mb-5">
                <h2 className="text-xl font-semibold text-mono">
                  You’re all set!
                </h2>
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
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

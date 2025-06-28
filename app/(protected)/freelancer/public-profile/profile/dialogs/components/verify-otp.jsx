'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import '@/components/ui/select';
import { RiCheckboxCircleFill, RiErrorWarningFill } from '@remixicon/react';
import { verifyOtp } from '@/services/freelancer/profile';
import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { Spinner } from '@/components/ui/spinners';
import { Steps } from './';

export const VerifyOtp = ({ handleNextStep, handleBackStep, mobile, t }) => {
  const [otp, setOtp] = useState('');

  const handleSubmit = async () => {
    mutation.mutate({ mobile, otp });
  };

  const mutation = useMutation({
    mutationFn: verifyOtp,
    onSuccess: async (data) => {
      handleNextStep();
      toast.custom(
        () => (
          <Alert variant="mono" icon="success">
            <AlertIcon>
              <RiCheckboxCircleFill />
            </AlertIcon>
            <AlertTitle>{data?.message}</AlertTitle>
          </Alert>
        ),
        {
          position: 'top-center',
        },
      );
    },
    onError: (error) => {
      toast.custom(
        () => (
          <Alert variant="mono" icon="destructive">
            <AlertIcon>
              <RiErrorWarningFill />
            </AlertIcon>
            <AlertTitle>{error.message}</AlertTitle>
          </Alert>
        ),
        {
          position: 'top-center',
        },
      );
    },
  });

  const isProcessing = mutation.isPending || false;

  return (
    <div className="h-full flex flex-col p-6">
      <Steps currentStep={0} t={t} />
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex flex-col gap-5 w-full md:w-[70%] mx-auto">
          <div className="flex flex-col items-center gap-y-2.5 mb-5">
            <h2 className="text-xl font-semibold text-mono">
              {t('stepOtpTitle')}
            </h2>
            <p className="text-sm text-secondary-foreground leading-5.5 text-center">
              {t('stepOtpDesc')}
            </p>
          </div>
          <div className="w-full">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={setOtp}
              onComplete={(val) => setOtp(val)}
            >
              <InputOTPGroup className="w-full flex justify-center gap-2">
                <InputOTPSlot
                  index={0}
                  className="border border-input rounded-md"
                />
                <InputOTPSlot
                  index={1}
                  className="border border-input rounded-md"
                />
                <InputOTPSlot
                  index={2}
                  className="border border-input rounded-md"
                />
                <InputOTPSeparator />
                <InputOTPSlot
                  index={3}
                  className="border border-input rounded-md"
                />
                <InputOTPSlot
                  index={4}
                  className="border border-input rounded-md"
                />
                <InputOTPSlot
                  index={5}
                  className="border border-input rounded-md"
                />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:justify-end gap-2.5">
          <Button type="button" variant="outline" onClick={handleBackStep}>
            {t('backBtn')}
          </Button>

          <Button
            disabled={isProcessing || !(otp.length == 6)}
            onClick={handleSubmit}
          >
            {isProcessing && <Spinner className="animate-spin" />}
            {t('verifyBtn')}
          </Button>
        </div>
      </div>
    </div>
  );
};

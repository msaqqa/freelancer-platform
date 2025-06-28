'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  IdentityEnd,
  IdentityStart,
  SendOtp,
  UpdateIdentity,
  VerifyOtp,
} from './components';

export const IdentityVerificationDialog = ({ open, closeDialog }) => {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState('');
  const { t } = useTranslation('freelancerProfile');
  const fp = (key) => t(`identity.${key}`);
  const iv = (key) => t(`identity.validation${key}`);

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
        className="mx-auto grow w-full max-w-xl p-0 gap-0"
        variant="fullscreen"
      >
        <DialogHeader className="py-5 px-6 mb-0 border-b border-border">
          <DialogTitle>{fp('dialogTitle')}</DialogTitle>
        </DialogHeader>
        {step === 1 && <IdentityStart handleNextStep={handleNextStep} t={fp} />}
        {step === 2 && (
          <SendOtp
            handleNextStep={handleNextStep}
            closeDialog={closeDialog}
            setMobile={setMobile}
            t={fp}
            v={iv}
          />
        )}
        {step === 3 && (
          <VerifyOtp
            handleNextStep={handleNextStep}
            handleBackStep={handleBackStep}
            mobile={mobile}
            t={fp}
          />
        )}
        <UpdateIdentity
          step={step}
          handleNextStep={handleNextStep}
          handleBackStep={handleBackStep}
          t={fp}
        />
        {step === 6 && <IdentityEnd closeDialog={closeDialog} t={fp} />}
      </DialogContent>
    </Dialog>
  );
};

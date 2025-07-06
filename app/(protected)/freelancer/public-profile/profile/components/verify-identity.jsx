'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { IdentityVerificationDialog } from '../dialogs';

const VerifyIdentity = ({ user }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const { t } = useTranslation('freelancerProfile');
  const fp = (key) => t(`identity.${key}`);
  const [isDisabled, setIsDisabled] = useState(false);
  const status = user?.id_verified?.status;

  useEffect(() => {
    if (status == 0 || status == 1) {
      setIsDisabled(true);
    }
  }, [user]);

  const handleIdentityBtn = () => {
    if (status == 2 || status == null) {
      setOpenDialog(true);
    }
  };
  return (
    <Card className="shadow-none p-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-7">
        <div className="flex flex-col md:flex-row items-center gap-5">
          <div className="relative size-[100px] shrink-0">
            <img
              src={toAbsoluteUrl('/media/illustrations/41.svg')}
              className="dark:hidden h-[100px] max-w-none"
              alt="image"
            />
            <img
              src={toAbsoluteUrl('/media/illustrations/41-dark.svg')}
              className="light:hidden h-[100px] max-w-none"
              alt="image"
            />
          </div>
          <div className="flex flex-col gap-1.5 max-w-[300px] text-center md:text-start">
            <h2 className="text-xl font-semibold text-mono">
              {fp('identityTitle')}
            </h2>
            <p className="text-sm text-secondary-foreground leading-5.5">
              {fp('identityDesc')}
            </p>
          </div>
        </div>
        <div className="grid justify-end min-w-20">
          <Button
            variant="mono"
            disabled={isDisabled}
            onClick={handleIdentityBtn}
          >
            {fp('identityBtn')}
          </Button>
        </div>
      </div>
      <IdentityVerificationDialog
        open={openDialog}
        closeDialog={() => setOpenDialog(false)}
      />
    </Card>
  );
};

export { VerifyIdentity };

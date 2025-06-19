import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CircularProgress, Progress } from '@/components/ui/progress';
import { VerifyBadgeDialog } from '../dialogs/verify-badge-dialog';

export function StepperProgress({ currentStep, totalSteps }) {
  const progressPercent = Math.round((currentStep / totalSteps) * 100);
  const offset = 314 - (314 * progressPercent) / 100;

  return (
    <div className="relative w-25 h-25">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="46"
          cy="46"
          r="40"
          stroke="#e5e7eb"
          strokeWidth="8"
          fill="none"
        />
        <circle
          id="progress-circle"
          cx="46"
          cy="46"
          r="40"
          stroke="#3b82f6"
          strokeWidth="8"
          fill="none"
          strokeDasharray="314"
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          id="progress-text"
          className="text-xl font-semibold text-blue-600"
        >
          {progressPercent}%
        </span>
      </div>
    </div>
  );
}

const VerifyBadge = () => {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <Card className="shadow-none p-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-7">
        <div className="flex flex-col md:flex-row items-center gap-5">
          <CircularProgress value={75} size={100} strokeWidth={8} />
          <div className="flex flex-col gap-1.5 max-w-[300px]">
            <h2 className="text-xl font-semibold text-mono">
              Get verified badge
            </h2>
            <p className="text-sm text-secondary-foreground leading-5.5">
              The verified badge builds instant trust with our clients. Complete
              your profile to get yours!
            </p>
          </div>
        </div>
        <div className="grid justify-end min-w-20">
          <Button variant="mono" onClick={() => setOpenDialog(true)}>
            Complete profile (7/9)
          </Button>
        </div>
      </div>
      <VerifyBadgeDialog
        open={openDialog}
        closeDialog={() => setOpenDialog(false)}
      />
    </Card>
  );
};

export { VerifyBadge };

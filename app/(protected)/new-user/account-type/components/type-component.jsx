'use client';

import { Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinners';

function TypeComponent({
  img,
  title,
  desc,
  options,
  handleChange,
  handleSubmit,
  isProcessing,
}) {
  const { t } = useTranslation('requiredData');

  return (
    <div className="pt-[80px] pb-[20px] px-[20px] w-6/7 mx-auto border rounded-xl">
      <div className="flex flex-col items-center">
        <div className="flex justify-center mb-5">
          <img
            src={toAbsoluteUrl(img.light)}
            className="dark:hidden max-h-[140px]"
            alt="image"
          />

          <img
            src={toAbsoluteUrl(img.dark)}
            className="light:hidden max-h-[140px]"
            alt="image"
          />
        </div>
        <h3 className="text-lg font-medium text-mono text-center mb-3">
          {title}
        </h3>
        <div className="text-sm text-center text-secondary-foreground mb-6">
          {desc}
        </div>
        <div className="flex flex-col justify-center gap-y-5 mb-2 w-full lg:max-w-[500px]">
          {/* Options */}
          {options.map((option) => {
            return (
              <div
                key={option.value}
                onClick={() => handleChange(option.value)}
                className={`flex justify-between items-center p-8 rounded-lg cursor-pointer transition border ${
                  option.active ? 'border-primary' : 'border-input'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <img
                      src={toAbsoluteUrl(option.lightImg)}
                      className="dark:hidden max-h-[140px]"
                      alt="image"
                    />

                    <img
                      src={toAbsoluteUrl(option.darkImg)}
                      className="light:hidden max-h-[140px]"
                      alt="image"
                    />
                    <Label variant="primary">{option.name}</Label>
                  </div>
                </div>
                <div
                  className={`h-5 w-5 rounded-full flex items-center justify-center
                        ${option.active ? 'bg-blue-500 text-white' : 'bg-transparent border border-gray-400'}`}
                >
                  {option.active && <Check size={12} strokeWidth={3} />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-end pt-2.5">
        <Button type="button" onClick={handleSubmit} disabled={isProcessing}>
          {isProcessing && <Spinner className="animate-spin" />}
          {t('saveBtn')}
        </Button>
      </div>
    </div>
  );
}

export default TypeComponent;

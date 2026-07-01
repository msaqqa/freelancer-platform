'use client';

import Link from 'next/link';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Checkbox } from '@/components/ui/checkbox';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

const CheckRow = ({ name, control, children }) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <div className="flex items-start gap-2.5">
          <FormControl>
            <Checkbox
              className="mt-0.5"
              checked={field.value}
              onCheckedChange={(checked) => field.onChange(!!checked)}
            />
          </FormControl>
          <span className="text-sm text-foreground leading-relaxed">
            {children}
          </span>
        </div>
        <FormMessage />
      </FormItem>
    )}
  />
);

export const Review = () => {
  const form = useFormContext();
  const { t } = useTranslation('services');

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-xl font-semibold text-mono">
          {t('review.readyTitle')}
        </h2>
        <p className="text-sm text-muted-foreground mt-1.5">
          {t('review.readyDesc')}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-base font-semibold text-mono">
          {t('review.legalTitle')}
        </h3>
        <CheckRow name="legalConfirm" control={form.control}>
          {t('review.legalText')}
        </CheckRow>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-base font-semibold text-mono">
          {t('review.termsTitle')}
        </h3>
        <CheckRow name="agreeTerms" control={form.control}>
          {t('review.termsIntro')}{' '}
          <Link
            href="/privacy-policy"
            target="_blank"
            className="text-primary hover:underline"
          >
            {t('review.termsOfUse')}
          </Link>
          ,{' '}
          <Link
            href="/privacy-policy"
            target="_blank"
            className="text-primary hover:underline"
          >
            {t('review.userAgreement')}
          </Link>
          , {t('review.and')}{' '}
          <Link
            href="/privacy-policy"
            target="_blank"
            className="text-primary hover:underline"
          >
            {t('review.privacyPolicy')}
          </Link>
          .
        </CheckRow>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-base font-semibold text-mono">
          {t('review.privacyTitle')}
        </h3>
        <CheckRow name="privacyAck" control={form.control}>
          {t('review.privacyText')}
        </CheckRow>
      </div>
    </div>
  );
};

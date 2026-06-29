'use client';

import Link from 'next/link';
import { useFormContext } from 'react-hook-form';
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

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-xl font-semibold text-mono">Ready to Launch?</h2>
        <p className="text-sm text-muted-foreground mt-1.5">
          Make sure everything is set before you go live. Just a few final
          checks!
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-base font-semibold text-mono">Legal Confirmation</h3>
        <CheckRow name="legalConfirm" control={form.control}>
          Please confirm that the content you&apos;re about to publish is either
          original or properly licensed, and that it aligns with our community
          guidelines.
        </CheckRow>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-base font-semibold text-mono">Terms &amp; Policies</h3>
        <CheckRow name="agreeTerms" control={form.control}>
          I have read and agree to the{' '}
          <Link
            href="/privacy-policy"
            target="_blank"
            className="text-primary hover:underline"
          >
            Terms of Use
          </Link>
          ,{' '}
          <Link
            href="/privacy-policy"
            target="_blank"
            className="text-primary hover:underline"
          >
            User Agreement
          </Link>
          , and{' '}
          <Link
            href="/privacy-policy"
            target="_blank"
            className="text-primary hover:underline"
          >
            Privacy Policy
          </Link>
          .
        </CheckRow>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-base font-semibold text-mono">Privacy Notice</h3>
        <CheckRow name="privacyAck" control={form.control}>
          By submitting and activating this service, you agree that it will
          appear in public search results and may be visible even if your profile
          is set to private or restricted to registered users only.
        </CheckRow>
      </div>
    </div>
  );
};

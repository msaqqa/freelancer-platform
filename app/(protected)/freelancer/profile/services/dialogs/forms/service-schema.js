import { z } from 'zod';

// Plain-text length inside the rich-text description.
const textLength = (html) => {
  if (typeof document === 'undefined' || !html) return 0;
  const el = document.createElement('div');
  el.innerHTML = html;
  return (el.textContent || '').trim().length;
};

const notEmpty = (v) => String(v ?? '').trim() !== '';

// Validation schema (skills optional). Field names match the step components.
export const ServiceSchema = (t) =>
  z
    .object({
      service: z.string().trim().min(1, t('serviceNameRequired')),
      category: z.string().min(1, t('industryRequired')),
      specialty: z.string().min(1, t('specialtyRequired')),
      'delivery-Days': z.any().refine(notEmpty, t('deliveryDaysRequired')),
      'Project price': z.any().refine(notEmpty, t('projectPriceRequired')),
      images: z.array(z.any()).min(1, t('atLeastOneImage')),
      requirements: z
        .array(z.any())
        .refine((arr) => arr?.some((r) => r?.requirementsDetails?.trim()), {
          message: t('atLeastOneRequirement'),
          path: [0, 'requirementsDetails'],
        }),
      description: z
        .any()
        .refine(
          (html) => textLength(html) >= 10,
          t('descriptionMinChars', { min: 10 }),
        ),
      legalConfirm: z
        .boolean()
        .refine((v) => v === true, t('legalConfirmRequired')),
      agreeTerms: z.boolean().refine((v) => v === true, t('agreeTermsRequired')),
      privacyAck: z
        .boolean()
        .refine((v) => v === true, t('privacyAckRequired')),
    })
    .passthrough();

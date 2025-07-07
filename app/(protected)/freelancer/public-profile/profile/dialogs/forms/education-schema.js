import { z } from 'zod';

export const FreelancerEducationSchema = (t) => {
  return z
    .object({
      university: z.string().min(1, { message: t('universityRequired') }),

      study: z.string().min(1, { message: t('studyRequired') }),

      grade: z.string().min(1, { message: t('gradeRequired') }),

      degree: z.string().optional(),

      startMonth: z.string().min(1, { message: t('startMonthRequired') }),
      startYear: z.string().min(1, { message: t('startYearRequired') }),

      endMonth: z.string().optional(),
      endYear: z.string().optional(),
    })
    .superRefine((data, ctx) => {
      const hasEndMonth = !!data.endMonth;
      const hasEndYear = !!data.endYear;

      if (hasEndMonth && !hasEndYear) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t('endYearRequired'),
          path: ['endYear'],
        });
      }

      if (!hasEndMonth && hasEndYear) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t('endMonthRequired'),
          path: ['endMonth'],
        });
      }
    })
    .refine(
      (data) => {
        if (data.endYear && data.startYear) {
          const end = parseInt(data.endYear);
          const start = parseInt(data.startYear);
          if (!isNaN(end) && !isNaN(start)) {
            return end >= start;
          }
        }
        return true;
      },
      {
        message: t('endYearAfterStartYear'),
        path: ['endYear'],
      },
    );
};

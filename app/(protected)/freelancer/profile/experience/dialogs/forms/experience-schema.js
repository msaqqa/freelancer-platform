import { z } from 'zod';

export const FreelancerExperienceSchema = (t) => {
  return z
    .object({
      title: z.string().min(1, { message: t('titleRequired') }),
      company: z.string().min(1, { message: t('companyRequired') }),
      location: z.string().optional(),
      type: z.string().optional(),
      description: z.string().optional(),

      startMonth: z.string().min(1, { message: t('startMonthRequired') }),
      startYear: z.string().min(1, { message: t('startYearRequired') }),

      endMonth: z.string().optional(),
      endYear: z.string().optional(),

      currentlyWorking: z.boolean().optional(),
    })
    .superRefine((data, ctx) => {
      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth() + 1;

      // Prevent future start or end dates.
      const checkFutureDate = (yearStr, monthStr, path) => {
        const year = parseInt(yearStr);
        const month = parseInt(monthStr);
        if (
          !isNaN(year) &&
          !isNaN(month) &&
          (year > currentYear || (year === currentYear && month > currentMonth))
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: [path],
            message: t('noFutureDatesAllowed'),
          });
        }
      };

      if (data.startYear && data.startMonth) {
        checkFutureDate(data.startYear, data.startMonth, 'startMonth');
      }

      // End date only matters when the user is not currently working here.
      if (!data.currentlyWorking) {
        if (data.endYear && data.endMonth) {
          checkFutureDate(data.endYear, data.endMonth, 'endMonth');
        }

        if (data.endYear && data.startYear) {
          const end = parseInt(data.endYear);
          const start = parseInt(data.startYear);
          if (!isNaN(end) && !isNaN(start) && end < start) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: ['endYear'],
              message: t('endYearAfterStartYear'),
            });
          }
        }

        if (data.endMonth && !data.endYear) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['endYear'],
            message: t('endYearRequired'),
          });
        }

        if (!data.endMonth && data.endYear) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['endMonth'],
            message: t('endMonthRequired'),
          });
        }
      }
    });
};

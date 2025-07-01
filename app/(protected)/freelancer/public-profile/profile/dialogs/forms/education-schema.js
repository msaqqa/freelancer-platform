import { z } from 'zod';

export const FreelancerEducationSchema = (t) => {
  return z.object({
    university: z.string().min(1, { message: t('universityRequired') }),

    study: z.string().min(1, { message: t('studyRequired') }),

    grade: z.string().min(1, { message: t('gradeRequired') }),

    degree: z.string().optional(),

    startMonth: z.string().min(1, { message: t('startMonthRequired') }),
    startYear: z.string().min(1, { message: t('startYearRequired') }),

    endMonth: z.string().optional(),
    endYear: z.string().optional(),
  });
};

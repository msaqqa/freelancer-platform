import { z } from 'zod';

export const FreelancerEducationSchema = () => {
  return z.object({
    university: z.string().min(1, { message: 'University is required' }),

    study: z.string().min(1, { message: 'study is required' }),

    grade: z.string().min(1, { message: 'grade is required' }),

    degree: z.string().optional(),

    startDate: z.string().min(1, { message: 'Start date is required' }),

    endDate: z.string().min(1, { message: 'End date is required' }),
  });
};

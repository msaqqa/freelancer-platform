import { z } from 'zod';

export const FreelancerIdentitySchema = () => {
  return z.object({
    firstName: z.string().min(1, 'First name is required'),
    fatherName: z.string().min(1, 'Father name is required'),
    grandfatherName: z.string().min(1, 'Grandfather name is required'),
    familyName: z.string().min(1, 'Family name is required'),
    IDNumber: z.string().min(1, 'ID number is required'),
    fullAddress: z.string().min(1, 'Full address is required'),
    image: z
      .instanceof(File, { message: 'ID image is required.' })
      .refine((file) => file.size <= 800 * 800, {
        message: 'Image file must be smaller than 2MB',
      })
      .refine((file) => ['image/jpeg', 'image/png'].includes(file.type), {
        message: 'Only JPG or PNG, formats are allowed',
      }),
  });
};

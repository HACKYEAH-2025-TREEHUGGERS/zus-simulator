import { z } from 'zod';

export const calculateRetirementSchema = z.object({
  gender: z.enum(['male', 'female']),
  date: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: 'Invalid date format',
  }),
});

export type CalculateRetirementInput = z.infer<typeof calculateRetirementSchema>;

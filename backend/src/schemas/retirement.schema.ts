import { z } from 'zod';

export const calculateRetirementSchema = z.object({
  gender: z.enum(['male', 'female']),
  date: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: 'Invalid date format',
  }),
  grossSalary: z.number().min(0, { message: 'Gross salary must be non-negative' }),
  workStartDate: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: 'Invalid date format',
  }),
  estimatedRetirementAge: z.number(),
  zusFunds: z.number().optional(),
  includeSickLeave: z.boolean().default(false),
});

export type CalculateRetirementInput = z.infer<typeof calculateRetirementSchema>;

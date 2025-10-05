import { z } from 'zod';

export const calculateRetirementSchema = z.object({
  gender: z.enum(['male', 'female']),
  age: z.number(),
  grossSalary: z.number().min(0, { message: 'Gross salary must be non-negative' }),
  workStartDate: z.number(),
  wantedRetirement: z.number(),
  expectedRetirementYear: z.number(),
  zusFunds: z.number().optional(),
  initialCapital: z.number().optional(),
  includeSickLeave: z.boolean().default(false),
});

export type CalculateRetirementInput = z.infer<typeof calculateRetirementSchema>;

import React, { createContext } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export const genders = ['male', 'female'] as const

export const retirementFormSchema = z.object({
  step: z.number().min(1).max(3),
  age: z.number(),
  wantedRetirement: z.number(),
  gender: z.enum(genders),
  grossSalary: z
    .number()
    .min(0, { message: 'Gross salary must be non-negative' }),
  workStartDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date format',
  }),
  expectedRetirementYear: z.number(),
  zusFunds: z.number().optional(),
  initialCapital: z.number().optional(),
  includeSickLeave: z.boolean(),
  responseData: z.object({
    estimatedSickDaysMen: z.number().optional(),
    estimatedSickDaysWomen: z.number().optional(),
    expectedRetirementValueForNow: z.number().optional(),
    expectedRetirementValue: z.number().optional(),
    expectedRetirementValueDifference: z.number().optional(),
    expectedRetirementValueWithSickDays: z.number().optional(),
    replacementRate: z.number().optional(),
    salaryToReachWantedRetirement: z.number().optional(),
    yearsToReachWantedRetirement: z.number().optional(),
    accountBalanceByYear: z.record(z.number(), z.number()),
  }),
})

const RetirementFormContext = createContext<{
  form: ReturnType<typeof useForm<z.infer<typeof retirementFormSchema>>>
} | null>(null)

export const RetirementFormProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const form = useForm<z.infer<typeof retirementFormSchema>>({
    resolver: zodResolver(retirementFormSchema),
    defaultValues: {
      step: 1,
      age: undefined,
      gender: undefined,
      grossSalary: undefined,
      workStartDate: undefined,
      expectedRetirementYear: undefined,
      zusFunds: undefined,
      initialCapital: undefined,
      includeSickLeave: false,
      responseData: {
        estimatedSickDaysMen: undefined,
        estimatedSickDaysWomen: undefined,
        expectedRetirementValue: undefined,
        expectedRetirementValueDifference: undefined,
        expectedRetirementValueForNow: undefined,
        expectedRetirementValueWithSickDays: undefined,
        replacementRate: undefined,
        salaryToReachWantedRetirement: undefined,
        yearsToReachWantedRetirement: undefined,
        accountBalanceByYear: undefined,
      },
    },
    mode: 'onChange',
  })

  return (
    <RetirementFormContext.Provider value={{ form }}>
      <FormProvider {...form}>{children}</FormProvider>
    </RetirementFormContext.Provider>
  )
}

export const useRetirementForm = () => {
  const context = React.useContext(RetirementFormContext)
  if (!context) {
    throw new Error(
      'useRetirementForm must be used within a RetirementFormProvider',
    )
  }
  return context.form
}

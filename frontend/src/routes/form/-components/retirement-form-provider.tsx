import React, { createContext } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export const genders = ['male', 'female'] as const

export const retirementFormSchema = z.object({
  step: z.number().min(1).max(3),
  age: z.number(),
  expectedRetirement: z
    .number()
    .min(0, { message: 'Expected retirement must be non-negative' }),
  gender: z.enum(genders),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date format',
  }),
  grossSalary: z
    .number()
    .min(0, { message: 'Gross salary must be non-negative' }),
  workStartDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date format',
  }),
  estimatedRetirementAge: z.number(),
  zusFunds: z.number().optional(),
  initialCapital: z.number().optional(),
  includeSickLeave: z.boolean(),
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
      age: 0,
      expectedRetirement: 0,
      gender: 'male',
      date: new Date().toString(),
      grossSalary: 0,
      workStartDate: new Date().toString(),
      estimatedRetirementAge: 65,
      zusFunds: 0,
      initialCapital: 0,
      includeSickLeave: false,
    },
    mode: 'all',
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

import { useSearch } from '@tanstack/react-router'
import { useMemo } from 'react'
import { useRetirementForm } from './retirement-form-provider'
import { Stepper } from '@/components/stepper'

export const FormStepper = ({ maxSteps }: { maxSteps: number }) => {
  const { step } = useSearch({ from: '/form/' })
  const form = useRetirementForm()
  const completedSteps = form.watch('step')
  const currentStep = typeof step === 'number' ? step : 0

  const steps = useMemo(() => {
    return Array.from({ length: maxSteps }, (_, index) => ({
      to: '/form',
      search: { step: index + 1 },
      completed: index + 1 < currentStep,
    }))
  }, [completedSteps, currentStep])

  console.log(completedSteps, currentStep)

  return <Stepper currentStep={currentStep} steps={steps} className="my-6" />
}

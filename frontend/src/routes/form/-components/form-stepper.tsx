import { useSearch } from '@tanstack/react-router'
import { useRetirementForm } from './retirement-form-provider'
import { Stepper } from '@/components/stepper'

export const FormStepper = ({ maxSteps }: { maxSteps: number }) => {
  const { step } = useSearch({ from: '/form/' })
  const form = useRetirementForm()
  const completedSteps = form.watch('step')
  const currentStep = typeof step === 'number' ? step : 0

  return (
    <Stepper
      currentStep={currentStep}
      steps={Array.from({ length: maxSteps }, (_, index) => ({
        to: '/form',
        search: { step: index + 1 },
        completed: completedSteps < currentStep,
      }))}
      className="my-6"
    />
  )
}

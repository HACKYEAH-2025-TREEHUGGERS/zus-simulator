import { createFileRoute, useSearch } from '@tanstack/react-router'
import { z } from 'zod'
import { Text } from 'react-aria-components'
import { useTranslation } from 'react-i18next'
import { Step1 } from './step1'
import { Step3 } from './step3'
import { Step2 } from './step2'
import { RetirementStepGuard } from './-components/retirement-step-guard'
import { FormStepper } from './-components/form-stepper'
import { ScreenContainer } from '@/components/screen-container'

const searchSchema = z.object({
  step: z.number().optional(),
})

export const Route = createFileRoute('/form/')({
  component: RouteComponent,
  validateSearch: searchSchema,
})

function RouteComponent() {
  const { step } = useSearch({ from: Route.id })
  const { t } = useTranslation()

  const stepComponents = [<Step1 />, <Step2 />, <Step3 />]

  return (
    <RetirementStepGuard>
      <ScreenContainer className="flex max-w-[600px] flex-col gap-4">
        <FormStepper maxSteps={stepComponents.length} />
        <Text className="text-[#007A39] brightness-90 text-lg font-semibold">
          {t('step')} {step}/{stepComponents.length}
        </Text>

        {stepComponents[step ? step - 1 : 0]}
      </ScreenContainer>
    </RetirementStepGuard>
  )
}

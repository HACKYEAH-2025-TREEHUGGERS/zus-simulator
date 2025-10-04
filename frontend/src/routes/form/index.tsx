import { createFileRoute, useSearch } from '@tanstack/react-router'
import { z } from 'zod'
import { Text } from 'react-aria-components'
import { useTranslation } from 'react-i18next'
import { Step1 } from './step1'
import { Step3 } from './step3'
import { Step2 } from './step2'
import { RetirementFormProvider } from './-components/retirement-form-provider'
import { RetirementStepGuard } from './-components/retirement-step-guard'
import { ScreenContainer } from '@/components/screen-container'
import { Stepper } from '@/components/stepper'

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

  const stepComponents = [<Step1 />, <Step2 />, <Step3 />, <Step3 />]

  return (
    <RetirementFormProvider>
      <RetirementStepGuard>
        <ScreenContainer className="flex flex-col gap-4">
          <Stepper
            currentStep={step ?? 0}
            steps={Array.from(
              { length: stepComponents.length },
              (_, index) => ({
                to: '/form',
                search: { step: index + 1 },
              }),
            )}
            className="my-6"
          />
          <Text className="text-primary text-lg">
            {t('step')} {step}/{stepComponents.length}
          </Text>

          {stepComponents[step ? step - 1 : 0]}
        </ScreenContainer>
      </RetirementStepGuard>
    </RetirementFormProvider>
  )
}

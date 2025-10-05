import { useTranslation } from 'react-i18next'
import { Text } from 'react-aria-components'
import { useNavigate } from '@tanstack/react-router'
import { useRetirementForm } from './-components/retirement-form-provider'
import { NumberInput } from '@/components/number-input'
import { Button } from '@/components/button'

export function Step1() {
  const form = useRetirementForm()
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-2">
      <Text className="text-xl font-semibold text-black">
        {t('step1.enterBasicInfo')}
      </Text>
      <Text className="text-xl text-darkBlue">
        {t('step1.checkExpectations')}
      </Text>

      <NumberInput
        {...form.register('expectedRetirement', {
          required: true,
        })}
        value={form.watch('expectedRetirement')}
        defaultValue={form.getValues('expectedRetirement')}
        onChange={(v) => form.setValue('expectedRetirement', v)}
        minValue={0}
        label={t('step1.retirementQuestion')}
        className="mt-8"
        suffix="PLN"
        formatOptions={{
          maximumFractionDigits: 2,
        }}
        isRequired
      />

      <Button
        onClick={() => {
          const newStep =
            form.getValues('step') === 1 ? 2 : form.getValues('step')
          form.setValue('step', newStep)
          navigate({
            to: '/form',
            search: { step: 2 },
            replace: true,
          })
        }}
        isDisabled={
          !form.watch('expectedRetirement') ||
          !!form.formState.errors.expectedRetirement
        }
        className="mt-10 w-30 ml-auto"
      >
        {t('common.continue')}
      </Button>
    </div>
  )
}

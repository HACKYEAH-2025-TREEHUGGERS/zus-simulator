import { useTranslation } from 'react-i18next'
import { Text } from 'react-aria-components'
import { useNavigate } from '@tanstack/react-router'
import { useRetirementForm } from './-components/retirement-form-provider'
import { NumberInput } from '@/components/number-input'
import { Button } from '@/components/button'

export function Step2() {
  const form = useRetirementForm()
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-2">
      <Text className="text-xl font-semibold text-black">
        {t('step2.fillForm')}
      </Text>
      <Text className="text-xl text-darkBlue">
        {t('step2.seeYourForecast')}
      </Text>

      <form>
        <div>
          <NumberInput
            {...form.register('expectedRetirement', {
              required: true,
            })}
            onChange={(v) => form.setValue('expectedRetirement', v)}
            minValue={0}
            label={t('step1.retirementQuestion')}
            className="mt-8"
            suffix="PLN"
            formatOptions={{
              maximumFractionDigits: 2,
            }}
          />
        </div>

        <div className="flex">
          <Button
            onClick={() => {
              navigate({
                to: '/form',
                search: { step: 1 },
              })
            }}
            className="mt-10 w-40 mr-auto"
          >
            {t('common.back')}
          </Button>
          <Button
            type="submit"
            onClick={() => {
              const newStep =
                form.getValues('step') === 1 ? 2 : form.getValues('step')
              form.setValue('step', newStep)
              navigate({
                to: '/form',
                search: { step: newStep },
              })
            }}
            isDisabled={!form.formState.isValid}
            className="mt-10 w-40 ml-auto"
          >
            {t('common.continue')}
          </Button>
        </div>
      </form>
    </div>
  )
}

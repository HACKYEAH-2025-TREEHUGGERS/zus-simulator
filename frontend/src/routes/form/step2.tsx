import { useTranslation } from 'react-i18next'
import { Text } from 'react-aria-components'
import { useNavigate } from '@tanstack/react-router'
import { useRetirementForm } from './-components/retirement-form-provider'
import type { genders } from './-components/retirement-form-provider'
import { NumberInput } from '@/components/number-input'
import { Button } from '@/components/button'
import { Select, SelectItem } from '@/components/select'

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
        <div className='flex gap-15 mt-8"'>
          <NumberInput
            {...form.register('age', {
              required: true,
            })}
            onChange={(v) => form.setValue('age', v)}
            minValue={0}
            maxValue={150}
            label={t('step2.age')}
            className="w-[150px]"
            formatOptions={{
              maximumFractionDigits: 0,
            }}
            isRequired
          />
          <Select
            label={t('step2.gender')}
            value={form.watch('gender')}
            onChange={(selected) => {
              form.setValue('gender', selected as (typeof genders)[number])
            }}
            isRequired
          >
            <SelectItem id="male">{t('common.male')}</SelectItem>
            <SelectItem id="female">{t('common.female')}</SelectItem>
          </Select>
        </div>

        <NumberInput
          {...form.register('grossSalary', {
            required: true,
          })}
          onChange={(v) => form.setValue('grossSalary', v)}
          minValue={0}
          label={t('step2.salaryGross')}
          className="mt-8"
          suffix="PLN"
          isRequired
          formatOptions={{
            maximumFractionDigits: 2,
          }}
        />

        <NumberInput
          {...form.register('workStartDate', {
            required: true,
          })}
          onChange={(v) => form.setValue('workStartDate', v.toString())}
          minValue={new Date().getFullYear() - 100}
          maxValue={new Date().getFullYear()}
          label={t('step2.workStartYear')}
          className="mt-8"
          isRequired
          formatOptions={{
            maximumFractionDigits: 0,
          }}
          tooltip={t('step2.tooltipWorkStartDate')}
        />

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

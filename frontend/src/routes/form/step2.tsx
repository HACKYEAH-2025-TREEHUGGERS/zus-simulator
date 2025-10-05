import { useTranslation } from 'react-i18next'
import { Text } from 'react-aria-components'
import { useNavigate } from '@tanstack/react-router'
import { useRetirementForm } from './-components/retirement-form-provider'
import type { genders } from './-components/retirement-form-provider'
import { NumberInput } from '@/components/number-input'
import { Button } from '@/components/button'
import { Select, SelectItem } from '@/components/select'
import { Checkbox } from '@/components/checkbox'

export function Step2() {
  const form = useRetirementForm()
  const navigate = useNavigate()
  const { t } = useTranslation()

  console.log(form.formState.errors)

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
              valueAsNumber: true,
            })}
            defaultValue={form.getValues('age')}
            onChange={(v) => form.setValue('age', v)}
            minValue={1}
            maxValue={130}
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
            defaultValue={form.getValues('gender')}
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
            valueAsNumber: true,
          })}
          defaultValue={form.getValues('grossSalary')}
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
            valueAsNumber: true,
          })}
          defaultValue={Number(form.getValues('workStartDate'))}
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

        <NumberInput
          {...form.register('expectedRetirementYear', {
            required: true,
            valueAsNumber: true,
          })}
          defaultValue={form.getValues('expectedRetirementYear')}
          onChange={(v) => form.setValue('expectedRetirementYear', v)}
          minValue={new Date().getFullYear()}
          maxValue={new Date().getFullYear() + 100}
          label={t('step2.workEndDate')}
          className="mt-8"
          isRequired
          formatOptions={{
            maximumFractionDigits: 0,
          }}
          tooltip={t('step2.tooltipWorkStartDate')}
        />

        <NumberInput
          {...form.register('zusFunds', {
            valueAsNumber: true,
          })}
          defaultValue={form.getValues('zusFunds')}
          onChange={(v) => form.setValue('zusFunds', v)}
          minValue={0}
          label={t('step2.zusFunds')}
          className="mt-8"
          suffix="PLN"
          formatOptions={{
            maximumFractionDigits: 2,
          }}
        />

        <Checkbox
          isSelected={form.watch('includeSickLeave')}
          defaultSelected={form.getValues('includeSickLeave')}
          onChange={(v) => form.setValue('includeSickLeave', v)}
          tooltip={t('step2.tooltipSickLeave')}
          className="mt-8"
        >
          {t('step2.includeSickLeave')}
        </Checkbox>

        <div className="flex">
          <Button
            onClick={() => {
              navigate({
                to: '/form',
                search: { step: 1 },
                replace: true,
              })
            }}
            className="mt-10 w-30 mr-auto"
            variant="secondary"
          >
            {t('common.back')}
          </Button>
          <Button
            type="submit"
            onClick={() => {
              const newStep =
                form.getValues('step') === 2 ? 3 : form.getValues('step')
              form.setValue('step', newStep)
              navigate({
                to: '/form',
                search: { step: newStep },
                replace: true,
              })
            }}
            isDisabled={!form.formState.isValid}
            className="mt-10 min-w-40 ml-auto"
          >
            {t('step2.programMyRetirement')}
          </Button>
        </div>
      </form>
    </div>
  )
}

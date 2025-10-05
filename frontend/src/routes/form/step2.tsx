/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { useTranslation } from 'react-i18next'
import { Text } from 'react-aria-components'
import { useNavigate } from '@tanstack/react-router'
import { useEffect, useMemo } from 'react'
import { useRetirementForm } from './-components/retirement-form-provider'
import type {
  genders,
  retirementFormSchema,
} from './-components/retirement-form-provider'
import type z from 'zod'
import { NumberInput } from '@/components/number-input'
import { Button } from '@/components/button'
import { Select, SelectItem } from '@/components/select'
import { Checkbox } from '@/components/checkbox'

export function Step2() {
  const form = useRetirementForm()
  const navigate = useNavigate()
  const { t } = useTranslation()

  useEffect(() => {
    if (Number(form.watch('workStartDate')) > 1998) {
      form.setValue('initialCapital', undefined)
    }
  }, [form.watch('workStartDate')])

  const submit = async (data: z.infer<typeof retirementFormSchema>) => {
    try {
      const response = await fetch(
        'http://localhost:3000/api/retirement/calculate',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      )

      const result = await response.json()

      // Save the API response to form context
      form.setValue('responseData', {
        estimatedSickDaysMen: result.estimatedSickDaysMen,
        estimatedSickDaysWomen: result.estimatedSickDaysWomen,
        expectedRetirementValueDifference:
          result.expectedRetirementValueDifference,
        expectedRetirementValueForNow: result.expectedRetirementValueForNow,
        expectedRetirementValue: result.expectedRetirementValue,
        expectedRetirementValueWithSickDays:
          result.expectedRetirementValueWithSickDays,
        replacementRate: result.replacementRate,
      })
    } catch (error) {
      console.error('Error calling API:', error)
    }
  }

  const isInvalid = useMemo(() => {
    if (!form.getValues('gender')?.length) return true

    return Number(form.watch('workStartDate')) > 1999
      ? Object.entries(form.getValues())
          .filter(([key]) => key !== 'initialCapital')
          .some(([_, value]) => Number.isNaN(value) || value === undefined)
      : Object.values(form.getValues()).some(
          (v) => Number.isNaN(v) || v === undefined,
        )
  }, [form.watch()])

  return (
    <div className="flex flex-col gap-2">
      <Text className="text-xl font-semibold text-black">
        {t('step2.fillForm')}
      </Text>
      <Text className="text-base text-black/80">
        {t('step2.seeYourForecast')}
      </Text>

      <form onSubmit={form.handleSubmit(submit)} className="mt-8">
        <div className='mt-8" flex gap-15'>
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
            placeholder="30"
          />

          <Select
            {...form.register('gender')}
            label={t('step2.gender')}
            value={form.watch('gender')}
            defaultValue={form.getValues('gender')}
            onChange={(selected) => {
              form.setValue('gender', selected as (typeof genders)[number])
            }}
            isRequired
            placeholder={t('common.select')}
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
          placeholder={t('common.enterPLN')}
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
          placeholder="1990"
        />

        {Number(form.watch('workStartDate')) < 1999 && (
          <NumberInput
            {...form.register('initialCapital', {
              valueAsNumber: true,
            })}
            defaultValue={form.getValues('initialCapital')}
            onChange={(v) => form.setValue('initialCapital', v)}
            minValue={0}
            label={t('step2.initialCapital')}
            className="animate-slide-down mt-8"
            suffix="PLN"
            formatOptions={{
              maximumFractionDigits: 2,
            }}
            tooltip={t('step2.tooltipInitialCapital')}
            placeholder={t('common.enterPLN')}
          />
        )}

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
          placeholder={(new Date().getFullYear() + 30).toString()}
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
          placeholder={t('common.enterPLN')}
        />

        <Checkbox
          {...form.register('includeSickLeave')}
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
            className="mt-10 mr-auto w-30"
            variant="secondary"
          >
            {t('common.back')}
          </Button>
          <Button
            type="submit"
            onClick={async (e) => {
              e.preventDefault()
              if (!isInvalid) {
                await submit(form.getValues())
                const newStep =
                  form.getValues('step') === 2 ? 3 : form.getValues('step')
                form.setValue('step', newStep)
                navigate({
                  to: '/form',
                  search: { step: newStep },
                  replace: true,
                })
              }
            }}
            isDisabled={isInvalid}
            className="mt-10 ml-auto min-w-40"
          >
            {t('step2.programMyRetirement')}
          </Button>
        </div>
      </form>
    </div>
  )
}

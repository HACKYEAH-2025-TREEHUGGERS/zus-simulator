import { useTranslation } from 'react-i18next'
import { Text } from 'react-aria-components'
import { useNavigate } from '@tanstack/react-router'
import ReactEcharts from 'echarts-for-react'
import { useRetirementForm } from './-components/retirement-form-provider'
import { FunFactFooter } from './-components/fun-fact-footer'
import { NumberInput } from '@/components/number-input'
import { Button } from '@/components/button'

export function Step1() {
  const form = useRetirementForm()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const option = {
    color: ['#00993f', '#a0cca9', '#b4d7bb', '#c8e2ce', '#dceddf', '#eff8f0'],
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        const amounts: Record<string, string> = {
          'Poniżej minimalnej': '< 1780 PLN',
          Minimalna: '~1780 PLN',
          'Poniżej średniej': '1780 - 3500 PLN',
          'Na poziomie średniej': '~3500 PLN',
          'Powyżej średniej': '3500 - 6000 PLN',
          Wysokie: '> 6000 PLN',
        }
        return `${params.name}<br/>${amounts[params.name]}<br/>${params.percent}%`
      },
    },
    series: [
      {
        name: 'Access Source',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '60%'],
        itemStyle: {
          borderRadius: 0,
          borderColor: '#fff',
          borderWidth: 2,
        },

        data: [
          { value: 30, name: 'Poniżej minimalnej' },
          { value: 180, name: 'Minimalna' },
          { value: 70, name: 'Wysokie' },
          { value: 140, name: 'Powyżej średniej' },
          { value: 480, name: 'Poniżej średniej' },
          { value: 170, name: 'Na poziomie średniej' },
        ],

        label: {
          show: true,
          formatter: '{b}: {d}%',
        },

        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  }

  return (
    <div className="flex flex-col gap-2">
      <Text className="text-xl font-semibold text-black">
        {t('step1.enterBasicInfo')}
      </Text>
      <Text className="text-base text-black/80">
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
        placeholder={t('common.enterPLN')}
      />

      <ReactEcharts
        option={option}
        style={{ width: '100%', height: '300px' }}
      />

      <Text className="mt-8 text-center text-xl font-semibold text-black">
        {t('step1.didYouKnow')}
      </Text>

      <FunFactFooter />

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
        className="mt-10 ml-auto w-30"
      >
        {t('common.continue')}
      </Button>
    </div>
  )
}

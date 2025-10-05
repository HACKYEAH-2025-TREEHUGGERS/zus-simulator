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

  const expectedRetirement = form.watch('wantedRetirement') || 0

  const getCategory = (value: number): string => {
    if (value < 1780) return t('step1.category.below_min')
    if (value >= 1780 && value < 2000) return t('step1.category.minimal')
    if (value >= 2000 && value < 3500) return t('step1.category.below_avg')
    if (value >= 3500 && value < 4000) return t('step1.category.at_avg')
    if (value >= 4000 && value < 6000) return t('step1.category.above_avg')
    return t('step1.category.high')
  }

  const currentCategory = getCategory(expectedRetirement)

  const colors = [
    '#00993f',
    '#a0cca9',
    '#b4d7bb',
    '#c8e2ce',
    '#dceddf',
    '#eff8f0',
  ]

  const getColorForCategory = (categoryName: string): string => {
    if (categoryName === currentCategory) {
      return colors[0]
    }
    const categories = [
      t('step1.category.below_min'),
      t('step1.category.minimal'),
      t('step1.category.below_avg'),
      t('step1.category.at_avg'),
      t('step1.category.above_avg'),
      t('step1.category.high'),
    ]
    const index = categories.indexOf(categoryName)
    return colors[Math.min(index + 1, colors.length - 1)]
  }

  const option = {
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        const amounts: Record<string, string> = {
          [t('step1.category.below_min')]: t(
            'step1.category.amounts.below_min',
          ),
          [t('step1.category.minimal')]: t('step1.category.amounts.minimal'),
          [t('step1.category.below_avg')]: t(
            'step1.category.amounts.below_avg',
          ),
          [t('step1.category.at_avg')]: t('step1.category.amounts.at_avg'),
          [t('step1.category.above_avg')]: t(
            'step1.category.amounts.above_avg',
          ),
          [t('step1.category.high')]: t('step1.category.amounts.high'),
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
          {
            value: 30,
            name: t('step1.category.below_min'),
            itemStyle: {
              color: getColorForCategory(t('step1.category.below_min')),
            },
          },
          {
            value: 180,
            name: t('step1.category.minimal'),
            itemStyle: {
              color: getColorForCategory(t('step1.category.minimal')),
            },
          },
          {
            value: 70,
            name: t('step1.category.high'),
            itemStyle: { color: getColorForCategory(t('step1.category.high')) },
          },
          {
            value: 140,
            name: t('step1.category.above_avg'),
            itemStyle: {
              color: getColorForCategory(t('step1.category.above_avg')),
            },
          },
          {
            value: 480,
            name: t('step1.category.below_avg'),
            itemStyle: {
              color: getColorForCategory(t('step1.category.below_avg')),
            },
          },
          {
            value: 170,
            name: t('step1.category.at_avg'),
            itemStyle: {
              color: getColorForCategory(t('step1.category.at_avg')),
            },
          },
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
        {...form.register('wantedRetirement', {
          required: true,
        })}
        value={form.watch('wantedRetirement')}
        defaultValue={form.getValues('wantedRetirement')}
        onChange={(v) => form.setValue('wantedRetirement', v)}
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
          !form.watch('wantedRetirement') ||
          !!form.formState.errors.wantedRetirement
        }
        className="mt-10 ml-auto w-1/3"
      >
        {t('common.continue')}
      </Button>
    </div>
  )
}

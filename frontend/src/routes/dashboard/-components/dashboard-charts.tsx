import { useMemo } from 'react'
import { Text } from 'react-aria-components'
import { useTranslation } from 'react-i18next'
import ReactEcharts from 'echarts-for-react'
import { Box } from '@/components/box'
import { LineChart } from '@/components/line-chart'
import { HelpTooltip } from '@/components/tooltip'
import { useRetirementForm } from '@/routes/form/-components/retirement-form-provider'
import { AVERAGE_RETIREMENT_VALUE } from '@/helpers/constants'

export const DashboardCharts = () => {
  const { t } = useTranslation()
  const form = useRetirementForm()
  const avgRetirementPercent = useMemo(() => {
    const currentValue = form.watch('responseData').expectedRetirementValue
    if (!currentValue) {
      return 0
    }
    return Math.round((currentValue / AVERAGE_RETIREMENT_VALUE) * 10000) / 100
  }, [form.watch('responseData').expectedRetirementValue])

  return (
    <div className="flex min-w-[600px] flex-col gap-2">
      <Box className="mt-4 flex flex-col gap-2">
        <Text className="text-sm">{t('dashboard.zusIncrement')}</Text>

        <ReactEcharts
          option={{
            color: ['#00993F', '#00993FAA'],
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                label: {
                  backgroundColor: '#6a7985',
                },
              },
            },
            legend: {
              data: [t('dashboard.mainAccount')],
              bottom: 5,
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: Object.keys(
                form.watch('responseData').accountBalanceByYear,
              ),
            },
            yAxis: {
              type: 'value',
              min: 3000,
            },
            series: [
              {
                name: t('dashboard.mainAccount'),
                data: Object.values(
                  form.watch('responseData').accountBalanceByYear,
                ),
                type: 'line',
                smooth: true,
                areaStyle: {},
              },
            ],
            grid: {
              top: 10,
              left: 10,
              right: 10,
              bottom: 30,
              containLabel: true,
            },
          }}
          style={{ width: '100%', height: '300px', padding: 0 }}
        />

        <div className="flex justify-evenly gap-8">
          <Box className="flex w-fit flex-col items-center px-2 py-1">
            <Text className="text-xs">{t('dashboard.accountValue')}</Text>
            <Text className="text-primary mt-2 text-sm font-semibold">
              168 000 zł
            </Text>
            <Text className="text-xs">
              {t('dashboard.stateAt', { year: 2025 })}
            </Text>
          </Box>

          <Box className="flex w-fit flex-col items-center px-2 py-1">
            <Text className="text-xs">{t('dashboard.subAccountValue')}</Text>
            <Text className="text-primary mt-2 text-sm font-semibold">
              42 000 zł
            </Text>
            <Text className="text-xs">
              {t('dashboard.stateAt', { year: 2025 })}
            </Text>
          </Box>

          <Box className="flex w-fit flex-col items-center px-2 py-1">
            <Text className="text-xs">{t('dashboard.forecast')}</Text>
            <Text className="text-primary mt-2 text-sm font-semibold">
              1 193 000 zł
            </Text>
            <Text className="text-xs">
              {t('dashboard.valueIn', { year: 2055 })}
            </Text>
          </Box>
        </div>
      </Box>

      <div className="mt-8 flex w-full gap-4">
        <Box className="flex flex-col gap-2">
          <Text className="flex gap-2 text-sm">
            {t('step3.exactValue')}
            <HelpTooltip text={t('step3.tooltipExactValue')} />
          </Text>
          <Text className="text-lg font-semibold">
            {form.watch('responseData').expectedRetirementValueForNow ?? '—'}
            &nbsp;PLN
          </Text>
        </Box>
        <Box className="flex flex-col gap-2">
          <Text className="flex gap-2 text-sm">
            {t('step3.realValue')}
            <HelpTooltip text={t('step3.tooltipRealValue')} />
          </Text>
          <Text className="text-lg font-semibold">
            {form.watch('responseData').expectedRetirementValue ?? '—'}
            &nbsp;PLN
          </Text>
        </Box>
      </div>

      <Box className="mt-4 flex flex-col gap-2">
        <Text className="text-sm">{t('step3.comparison')}</Text>

        <ReactEcharts
          option={{
            tooltip: {
              trigger: 'item',
              formatter: '{c}zł',
            },
            xAxis: {
              type: 'category',
              data: [
                t('step3.chart.expected'),
                t('step3.chart.forecasted'),
                t('step3.chart.average'),
              ],
            },
            yAxis: {
              type: 'value',
            },
            series: [
              {
                data: [
                  {
                    value: form.watch('wantedRetirement'),
                    itemStyle: { color: '#BEC3CE' },
                  },
                  {
                    value: form.watch('responseData').expectedRetirementValue,
                    itemStyle: { color: '#00993F' },
                  },
                  {
                    value: AVERAGE_RETIREMENT_VALUE,
                    itemStyle: { color: '#C8E2CE' },
                  },
                ],
                type: 'bar',
              },
            ],
          }}
          style={{ width: '100%', height: '300px', padding: 0 }}
        />

        <Text className="text-xs leading-2">
          {t('step3.expectationsLine1part1')}
          <span className="text-warning font-semibold">
            {Math.max(
              0,
              (form.watch('responseData').salaryToReachWantedRetirement ?? 0) -
                form.watch('wantedRetirement'),
            )}{' '}
            zł
          </span>
          {t('step3.expectationsLine1part2')}
        </Text>
        <Text className="text-xs leading-2">
          {t('step3.expectationsLine2part1')}
          <span className="font-semibold">
            {form.watch('responseData').yearsToReachWantedRetirement ?? 0} lat
          </span>
          {t('step3.expectationsLine2part2', {
            retirementYear:
              form.watch('expectedRetirementYear') +
              (form.watch('responseData').yearsToReachWantedRetirement ?? 0),
          })}
        </Text>
      </Box>

      <div className="mt-4 flex w-full gap-4">
        <Box className="flex flex-col gap-2">
          <Text className="text-sm">{t('step3.illnessInfluence')}</Text>

          <ReactEcharts
            option={{
              color: ['#00993F', '#C8E2CE'],
              tooltip: {
                trigger: 'axis',
                formatter: '{c}zł',
              },
              yAxis: {
                type: 'category',
                data: [t('step3.chart.withoutL4'), t('step3.chart.withL4')],
              },
              xAxis: {
                type: 'value',
                axisLabel: {
                  show: true,
                  formatter: (value: string, index: number) =>
                    index % 2 === 0 ? value : '',
                },
              },
              series: [
                {
                  type: 'bar',
                  data: [
                    { value: 3650, itemStyle: { color: '#00993F' } },
                    { value: 3214, itemStyle: { color: '#C8E2CE' } },
                  ],
                },
              ],
              grid: {
                left: 1,
                right: 20,
                top: 1,
                bottom: 1,
                containLabel: true,
              },
            }}
            style={{ width: '100%', height: '100px', padding: 0 }}
          />

          <Text className="text-xs">
            {t('step3.l4Loss')}:{' '}
            <span className="text-warning font-semibold">
              {' '}
              {form.watch('responseData').expectedRetirementValueDifference} zł
            </span>
          </Text>
        </Box>
        <Box className="flex flex-col gap-2">
          <Text className="text-sm">{t('step3.indicators')}</Text>

          <Text className="mt-auto flex justify-between text-sm leading-1">
            {t('step3.chart.replacementRate')}{' '}
            <span className="text-base leading-1">
              {form.watch('responseData').replacementRate ?? '—'}%
            </span>
          </Text>
          <LineChart
            value={form.watch('responseData').replacementRate ?? 0}
            color="#00993F"
          />
          <Text className="text-xs leading-1">
            {t('step3.chart.indexedWage')}: 11 300zł
          </Text>

          <Text className="mt-8 flex justify-between text-sm leading-1">
            {t('step3.chart.relativeAverageLevel')}{' '}
            <span className="text-base leading-1">{avgRetirementPercent}%</span>
          </Text>
          <LineChart value={avgRetirementPercent} color="#EF4444" />
          <Text className="mb-2 text-xs leading-1">
            {t('step3.chart.average')}: 4 200zł
          </Text>
        </Box>
      </div>

      <Box className="mt-4 flex flex-col gap-2">
        <Text className="text-sm">{t('step3.delayBenefits')}</Text>

        <ReactEcharts
          option={{
            color: ['#00993F'],
            tooltip: {
              trigger: 'axis',
              formatter: '{c}zł',
            },
            legend: {
              data: [t('step3.chart.retirementAmount')],
              bottom: 5,
            },
            xAxis: {
              type: 'category',
              data: [
                t('common.today'),
                t('common.years_plural', { count: 1 }),
                t('common.years_plural_2_4', { count: 2 }),
                t('common.years_plural_5+', { count: 5 }),
              ],
            },
            yAxis: {
              type: 'value',
              min: 3000,
            },
            series: [
              {
                name: t('step3.chart.retirementAmount'),
                data: [3145, 3587, 3910, 4922],
                type: 'line',
                smooth: true,
              },
            ],
            grid: {
              top: 10,
              left: 10,
              right: 10,
              bottom: 30,
              containLabel: true,
            },
          }}
          style={{ width: '100%', height: '300px', padding: 0 }}
        />

        <div className="flex justify-evenly gap-8">
          <Box className="flex w-fit flex-col items-center px-2 py-1">
            <Text className="text-xs">
              {t('common.years_plural', { count: 1 })}
            </Text>
            <Text className="text-primary mt-2 text-sm font-semibold">
              +10.0%
            </Text>
            <Text className="text-xs">+326zł</Text>
          </Box>

          <Box className="flex w-fit flex-col items-center px-2 py-1">
            <Text className="text-xs">
              {t('common.years_plural_2_4', { count: 2 })}
            </Text>
            <Text className="text-primary mt-2 text-sm font-semibold">
              +20.5%
            </Text>
            <Text className="text-xs">+759zł</Text>
          </Box>

          <Box className="flex w-fit flex-col items-center px-2 py-1">
            <Text className="text-xs">
              {t('common.years_plural_5+', { count: 5 })}
            </Text>
            <Text className="text-primary mt-2 text-sm font-semibold">
              +50.0%
            </Text>
            <Text className="text-xs">+1 326zł</Text>
          </Box>
        </div>
      </Box>
    </div>
  )
}

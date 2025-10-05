import { useTranslation } from 'react-i18next'
import { Text } from 'react-aria-components'
import { useNavigate } from '@tanstack/react-router'
import ReactEcharts from 'echarts-for-react'
import { useRetirementForm } from './-components/retirement-form-provider'
import { Button } from '@/components/button'
import { HelpTooltip } from '@/components/tooltip'
import { Box } from '@/components/box'
import { LineChart } from '@/components/line-chart'

export function Step3() {
  const form = useRetirementForm()
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-2">
      <Text className="text-xl font-semibold text-black">
        {t('step3.summary')}
      </Text>
      <Text className="text-base text-black/80 flex items-center gap-2">
        {t('step3.forecastMessage')}
        <HelpTooltip text={t('step3.forecastTooltip')} />
      </Text>

      <div className="mt-8 flex w-full gap-4">
        <Box className="flex flex-col gap-2">
          <Text className="text-sm">{t('step3.exactValue')}</Text>
          <Text className="text-lg font-semibold">2137 PLN</Text>
        </Box>
        <Box className="flex flex-col gap-2">
          <Text className="text-sm">{t('step3.realValue')}</Text>
          <Text className="text-lg font-semibold">2137 PLN</Text>
        </Box>
      </div>

      <Box className="flex flex-col gap-2 mt-4">
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
                    value: form.watch('expectedRetirement'),
                    itemStyle: { color: '#BEC3CE' },
                  },
                  {
                    value: 3214,
                    itemStyle: { color: '#00993F' },
                  },
                  {
                    value: 4595,
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
          <span className="font-semibold text-warning">1753 zł</span>
          {t('step3.expectationsLine1part2')}
        </Text>
        <Text className="text-xs leading-2">
          {t('step3.expectationsLine2part1')}
          <span className="font-semibold">5 lat</span>
          {t('step3.expectationsLine2part2', {
            retirementYear: 2040,
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
            <span className="font-semibold text-warning">-173 zł (5.1%)</span>
          </Text>
        </Box>
        <Box className="flex flex-col gap-2">
          <Text className="text-sm">{t('step3.indicators')}</Text>

          <Text className="mt-auto text-sm flex justify-between leading-1">
            {t('step3.chart.replacementRate')}{' '}
            <span className="text-base leading-1">28.7%</span>
          </Text>
          <LineChart value={28.7} color="#00993F" />
          <Text className="text-xs leading-1">
            {t('step3.chart.indexedWage')}: 11 300zł
          </Text>

          <Text className="mt-8 text-sm flex justify-between leading-1">
            {t('step3.chart.relativeAverageLevel')}{' '}
            <span className="text-base leading-1">77.3%</span>
          </Text>
          <LineChart value={77.3} color="#EF4444" />
          <Text className="mb-2 text-xs leading-1">
            {t('step3.chart.average')}: 4 200zł
          </Text>
        </Box>
      </div>

      <Box className="flex flex-col gap-2 mt-4">
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
          <Box className="flex flex-col items-center w-fit py-1 px-2">
            <Text className="text-xs">
              {t('common.years_plural', { count: 1 })}
            </Text>
            <Text className="text-sm font-semibold text-primary mt-2">
              +10.0%
            </Text>
            <Text className="text-xs">+326zł</Text>
          </Box>

          <Box className="flex flex-col items-center w-fit py-1 px-2">
            <Text className="text-xs">
              {t('common.years_plural_2_4', { count: 2 })}
            </Text>
            <Text className="text-sm font-semibold text-primary mt-2">
              +20.5%
            </Text>
            <Text className="text-xs">+759zł</Text>
          </Box>

          <Box className="flex flex-col items-center w-fit py-1 px-2">
            <Text className="text-xs">
              {t('common.years_plural_5+', { count: 5 })}
            </Text>
            <Text className="text-sm font-semibold text-primary mt-2">
              +50.0%
            </Text>
            <Text className="text-xs">+1 326zł</Text>
          </Box>
        </div>
      </Box>

      <div className="flex gap-2 mt-10">
        <Button
          onClick={() => {
            navigate({
              to: '/form',
              search: { step: 1 },
              reloadDocument: true,
            })
          }}
          className="w-full mr-auto"
          variant="secondary"
        >
          {t('step3.newSimulation')}
        </Button>
        <Button
          onClick={() => {
            navigate({
              to: '/form',
              search: { step: 3 },
              replace: true,
            })
          }}
          className="w-full ml-auto"
        >
          {t('step3.goToDashboard')}
        </Button>
      </div>
    </div>
  )
}

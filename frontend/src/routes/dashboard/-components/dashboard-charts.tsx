import { Text } from 'react-aria-components'
import { useTranslation } from 'react-i18next'
import ReactEcharts from 'echarts-for-react'
import { Box } from '@/components/box'
import { LineChart } from '@/components/line-chart'
import { HelpTooltip } from '@/components/tooltip'

export const DashboardCharts = () => {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col gap-2 min-w-[600px]">
      <Box className="flex flex-col gap-2 mt-4">
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
              data: [t('dashboard.mainAccount'), t('dashboard.subAccount')],
              bottom: 5,
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: [
                2010, 2012, 2015, 2018, 2020, 2023, 2025, 2030, 2035, 2040,
                2045, 2050, 2055,
              ],
            },
            yAxis: {
              type: 'value',
              min: 3000,
            },
            series: [
              {
                name: t('dashboard.mainAccount'),
                data: [
                  0, 8283, 33130, 54563, 92519, 167055, 248250, 405977, 500108,
                  670688, 757741, 861177, 1003000,
                ].map((v) => v * 0.9),
                type: 'line',
                smooth: true,
                areaStyle: {},
              },
              {
                name: t('dashboard.subAccount'),
                data: [
                  0, 8283, 35130, 77563, 142519, 237055, 318250, 455977, 570108,
                  770688, 897741, 1051177, 1193000,
                ],
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
          <Box className="flex flex-col items-center w-fit py-1 px-2">
            <Text className="text-xs">{t('dashboard.accountValue')}</Text>
            <Text className="text-sm font-semibold text-primary mt-2">
              168 000 zł
            </Text>
            <Text className="text-xs">
              {t('dashboard.stateAt', { year: 2025 })}
            </Text>
          </Box>

          <Box className="flex flex-col items-center w-fit py-1 px-2">
            <Text className="text-xs">{t('dashboard.subAccountValue')}</Text>
            <Text className="text-sm font-semibold text-primary mt-2">
              42 000 zł
            </Text>
            <Text className="text-xs">
              {t('dashboard.stateAt', { year: 2025 })}
            </Text>
          </Box>

          <Box className="flex flex-col items-center w-fit py-1 px-2">
            <Text className="text-xs">{t('dashboard.forecast')}</Text>
            <Text className="text-sm font-semibold text-primary mt-2">
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
          <Text className="text-sm gap-2 flex">
            {t('step3.exactValue')}
            <HelpTooltip text={t('step3.tooltipExactValue')} />
          </Text>
          <Text className="text-lg font-semibold">3247 PLN</Text>
        </Box>
        <Box className="flex flex-col gap-2">
          <Text className="text-sm gap-2 flex">
            {t('step3.realValue')}
            <HelpTooltip text={t('step3.tooltipRealValue')} />
          </Text>
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
                    value: 5212,
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
    </div>
  )
}

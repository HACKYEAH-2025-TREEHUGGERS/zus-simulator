import { useTranslation } from 'react-i18next'
import { Text } from 'react-aria-components'
import { useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/button'
import { HelpTooltip } from '@/components/tooltip'
import { Box } from '@/components/box'

export function Step3() {
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
        </Box>
        <Box className="flex flex-col gap-2">
          <Text className="text-sm">{t('step3.indicators')}</Text>
          <Text className="text-lg font-semibold">2137 PLN</Text>
        </Box>
      </div>

      <Box className="flex flex-col gap-2 mt-4"></Box>

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

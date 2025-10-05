import { createFileRoute } from '@tanstack/react-router'
import { Header, Text } from 'react-aria-components'
import { useTranslation } from 'react-i18next'
import { CompensationHistory } from './-components/compensation-history'
import { DashboardCharts } from './-components/dashboard-charts'
import { Button } from '@/components/button'
import { ScreenContainer } from '@/components/screen-container'

export const Route = createFileRoute('/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation()

  const handlePrint = () => {
    window.print()
  }

  return (
    <ScreenContainer className="print-full-width mx-auto flex w-full max-w-[950px] flex-col gap-2">
      <Header className="relative h-[50px] w-full">
        <Text className="text-xl font-semibold">{t('dashboard.title')}</Text>
        <Button
          className="print-hide-button absolute inset-x-0 top-0 mx-auto w-fit text-nowrap"
          onPress={handlePrint}
        >
          {t('dashboard.downloadReport')}
        </Button>
      </Header>
      <div className="flex flex-col gap-4 lg:flex-row">
        <DashboardCharts />
        <div className="print-hide">
          <CompensationHistory />
        </div>
      </div>
    </ScreenContainer>
  )
}

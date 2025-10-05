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

  return (
    <ScreenContainer className="flex flex-col gap-2 max-w-[950px] w-full mx-auto">
      <Header className="relative w-full h-[50px]">
        <Text className="text-xl font-semibold">{t('dashboard.title')}</Text>
        <Button className="absolute inset-x-0 top-0 text-nowrap w-fit mx-auto">
          {t('dashboard.downloadReport')}
        </Button>
      </Header>
      <div className="flex flex-col lg:flex-row gap-4">
        <DashboardCharts />
        <CompensationHistory />
      </div>
    </ScreenContainer>
  )
}

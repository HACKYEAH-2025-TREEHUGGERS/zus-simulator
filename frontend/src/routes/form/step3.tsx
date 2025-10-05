import { useTranslation } from 'react-i18next'
import { Text } from 'react-aria-components'
import { useNavigate } from '@tanstack/react-router'
import { useRetirementForm } from './-components/retirement-form-provider'
import { Button } from '@/components/button'

export function Step3() {
  const form = useRetirementForm()
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-2">
      <Text className="text-xl font-semibold text-black">
        {t('step3.summary')}
      </Text>
      <Text className="text-base text-black/80">
        {t('step3.forecastMessage')}
      </Text>

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

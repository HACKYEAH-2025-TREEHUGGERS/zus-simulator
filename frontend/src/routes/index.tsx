import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const { t } = useTranslation()

  return (
    <div className="text-center">
      <header className="">{t('Welcome to React')}</header>
    </div>
  )
}

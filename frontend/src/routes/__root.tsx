import { Outlet, createRootRoute, useNavigate } from '@tanstack/react-router'
import { I18nProvider, useLocale } from 'react-aria-components'
import Header from '../components/Header'
import { RetirementFormProvider } from './form/-components/retirement-form-provider'

export const Route = createRootRoute({
  component: () => {
    const { locale, direction } = useLocale()

    return (
      <I18nProvider locale="pl-PL">
        <RetirementFormProvider>
          <div lang={locale} dir={direction}>
            <Header />
            <Outlet />
          </div>
        </RetirementFormProvider>
      </I18nProvider>
    )
  },
  notFoundComponent: () => {
    const navigate = useNavigate()
    navigate({ to: '/' })
    return null
  },
})

import { Outlet, createRootRoute, useNavigate } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { I18nProvider, useLocale } from 'react-aria-components'
import Header from '../components/Header'

export const Route = createRootRoute({
  component: () => {
    const { locale, direction } = useLocale()

    return (
      <I18nProvider locale="pl-PL">
        <div lang={locale} dir={direction}>
          <Header />
          <Outlet />
          <TanStackDevtools
            config={{
              position: 'bottom-right',
            }}
            plugins={[
              {
                name: 'Tanstack Router',
                render: <TanStackRouterDevtoolsPanel />,
              },
            ]}
          />
        </div>
      </I18nProvider>
    )
  },
  notFoundComponent: () => {
    const navigate = useNavigate()
    navigate({ to: '/' })
    return null
  },
})

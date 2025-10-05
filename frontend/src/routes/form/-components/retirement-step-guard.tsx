import { useNavigate, useSearch } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useRetirementForm } from './retirement-form-provider'
import type { PropsWithChildren } from 'react'

export const RetirementStepGuard = ({ children }: PropsWithChildren) => {
  const { step: stepFromSearch } = useSearch({ from: '/form/' })
  const navigate = useNavigate({ from: '/form' })
  const form = useRetirementForm()
  const stepFromForm = form.watch('step')

  useEffect(() => {
    console.log(form.getValues())

    if (typeof stepFromSearch !== 'number') {
      navigate({
        to: '/form',
        search: (old) => ({ ...old, step: stepFromForm }),
        replace: true,
      })
      return
    }

    if (stepFromSearch > stepFromForm) {
      navigate({
        to: '/form',
        search: (old) => ({ ...old, step: stepFromForm }),
        replace: true,
      })
    }
  }, [stepFromForm, stepFromSearch])

  return <>{children}</>
}

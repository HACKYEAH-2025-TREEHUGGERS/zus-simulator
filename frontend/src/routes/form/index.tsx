import { createFileRoute, useSearch } from '@tanstack/react-router'
import { z } from 'zod'
import { Step1 } from './step1'
import { Step3 } from './step3'
import { Step2 } from './step2'

const searchSchema = z.object({
  step: z.number().optional(),
})

export const Route = createFileRoute('/form/')({
  component: RouteComponent,
  validateSearch: searchSchema,
})

function RouteComponent() {
  const { step } = useSearch({ from: Route.id })

  const getStep = () => {
    switch (step) {
      case 1:
        return <Step1 />
      case 2:
        return <Step2 />
      case 3:
        return <Step3 />
      default:
        return <Step1 /> // fallback to first screen
    }
  }

  return <div>{getStep()}</div>
}

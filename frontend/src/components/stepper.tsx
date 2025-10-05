import { Link, useLayoutEffect } from '@tanstack/react-router'
import { Breadcrumb, Breadcrumbs } from 'react-aria-components'
import { useRef, useState } from 'react'
import { useWindowSize } from '@uidotdev/usehooks'
import { CheckCircle2 } from 'lucide-react'
import { cn } from '@/helpers/cn'

type Step = {
  to: string
  search: Record<string, string | number>
  completed?: boolean
}

type StepperProps = {
  steps: Array<Step>
  currentStep: number
  className?: string
}

export const Stepper = ({ steps, currentStep, className }: StepperProps) => {
  const containerRef = useRef<HTMLOListElement>(null)
  const size = useWindowSize()
  const [containerWidth, setContainerWidth] = useState(0)

  useLayoutEffect(() => {
    setContainerWidth(containerRef.current?.getBoundingClientRect().width ?? 0)
  }, [size])

  return (
    <Breadcrumbs
      ref={containerRef}
      className={cn('flex items-center justify-center w-full', className)}
    >
      {steps.map((step, index) => (
        <Breadcrumb key={index} className="w-auto flex">
          <Link
            disabled={index >= currentStep}
            to={step.to}
            search={(old) => ({ ...old, ...step.search })}
            className="w-full inline-flex"
            aria-label={`Go to step ${index + 1}`}
            title={`Go to step ${index + 1}`}
          >
            <div className="flex items-center w-fit">
              {!!index && (
                <div
                  className={cn(
                    `h-px border-4 border-b border-background`,
                    index < currentStep && 'border-primary',
                  )}
                  style={{
                    width: containerWidth / steps.length + steps.length * 20,
                  }}
                />
              )}
              {index < currentStep ? (
                <div className="size-6 bg-primary rounded-full flex items-center justify-center">
                  {step.completed ? (
                    <CheckCircle2
                      fill="white"
                      className="text-primary"
                      size={20}
                    />
                  ) : null}
                </div>
              ) : (
                <div className="flex items-center justify-center font-semibold text-sm size-6 bg-background rounded-full">
                  {index + 1}
                </div>
              )}
            </div>
          </Link>
        </Breadcrumb>
      ))}
    </Breadcrumbs>
  )
}

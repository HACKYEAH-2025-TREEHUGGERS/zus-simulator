import type { PropsWithChildren } from 'react'
import { cn } from '@/helpers/cn'

type ScreenContainerProps = PropsWithChildren<{
  className?: string
}>

export const ScreenContainer = ({
  children,
  className,
}: ScreenContainerProps) => {
  return (
    <div className={cn('max-w-3xl mx-auto p-4 pb-20', className)}>
      {children}
    </div>
  )
}

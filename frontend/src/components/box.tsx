import { cn } from '@/helpers/cn'

export const Box = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div
      className={cn('border border-black/10 rounded-xl p-6 w-full', className)}
    >
      {children}
    </div>
  )
}

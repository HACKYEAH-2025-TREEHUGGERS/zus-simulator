import { Button as AriaButton } from 'react-aria-components'
import type { ButtonProps } from 'react-aria-components'
import { cn } from '@/helpers/cn'

type ButtonComponentProps = ButtonProps & {
  variant?: 'primary' | 'secondary'
} & React.RefAttributes<HTMLButtonElement>

export const Button = ({
  variant = 'primary',
  className,
  ...props
}: ButtonComponentProps) => {
  return (
    <AriaButton
      {...props}
      className={cn(
        'h-fit cursor-pointer rounded-lg py-2 px-5 flex gap-2 items-center font-medium justify-center hover:brightness-125 transition-all duration-200',
        {
          'opacity-50': props.isDisabled,
        },
        {
          'bg-primary text-white': variant === 'primary',
        },
        {
          'bg-white border hover:bg-black/2 border-primary text-primary':
            variant === 'secondary',
        },
        className,
      )}
    />
  )
}

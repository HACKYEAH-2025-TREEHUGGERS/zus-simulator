import { Button as AriaButton } from 'react-aria-components'
import type { ButtonProps } from 'react-aria-components'
import { cn } from '@/helpers/cn'

type ButtonComponentProps = ButtonProps & {
  variant?: 'primary' | 'secondary'
} & React.RefAttributes<HTMLButtonElement>

export const Button = ({ variant, ...props }: ButtonComponentProps) => {
  return (
    <AriaButton
      {...props}
      className={cn(
        'text-white h-fit cursor-pointer rounded-full py-2 px-5 flex gap-2 items-center font-medium justify-center bg-primary hover:brightness-125 transition-all',
        {
          'opacity-50': props.isDisabled,
        },
        {
          'bg-white border hover:bg-black/2 !border-primary !text-primary':
            variant === 'secondary',
        },
        props.className,
      )}
    />
  )
}

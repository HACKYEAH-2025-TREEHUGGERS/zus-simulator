import { Button as AriaButton } from 'react-aria-components'
import type { ButtonProps } from 'react-aria-components'
import { cn } from '@/helpers/cn'

export const Button = (
  props: ButtonProps & React.RefAttributes<HTMLButtonElement>,
) => {
  return (
    <AriaButton
      {...props}
      className={cn(
        'text-white cursor-pointer rounded-full py-2 px-5 flex gap-2 items-center font-medium justify-center bg-primary hover:brightness-125 transition-all',
        { 'opacity-50': props.isDisabled },
        props.className,
      )}
    />
  )
}

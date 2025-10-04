import { useRef } from 'react'
import { useTextField } from 'react-aria'
import { HelpTooltip } from './tooltip'
import type { AriaTextFieldProps } from 'react-aria'
import { cn } from '@/helpers/cn'

type TextInputProps = {
  className?: string
  suffix?: string
  tooltip?: string
} & AriaTextFieldProps

export const TextInput = ({
  className,
  suffix,
  tooltip,
  ...props
}: TextInputProps) => {
  const ref = useRef(null)
  const {
    labelProps,
    inputProps,
    descriptionProps,
    errorMessageProps,
    isInvalid,
    validationErrors,
  } = useTextField(props, ref)

  return (
    <div className={cn('flex flex-col', className)}>
      <label {...labelProps} className="mb-2 flex items-center gap-1">
        {props.label}
        {props.isRequired ? <span className="text-warning">*</span> : null}
        {tooltip && <HelpTooltip text={tooltip} />}
      </label>
      <div className="relative">
        <input
          {...inputProps}
          ref={ref}
          className="rounded-lg bg-input text-black px-4 py-3 text-base w-full"
        />
        <div className="absolute right-4 inset-y-0 my-auto flex items-center">
          {suffix}
        </div>
      </div>
      {props.description && (
        <div {...descriptionProps} className="text-xs">
          {props.description}
        </div>
      )}
      {isInvalid && (
        <div {...errorMessageProps} className="text-xs text-warning">
          {validationErrors.join(' ')}
        </div>
      )}
    </div>
  )
}

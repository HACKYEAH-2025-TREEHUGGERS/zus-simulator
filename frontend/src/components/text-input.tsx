import { useRef } from 'react'
import { useTextField } from 'react-aria'
import type { AriaTextFieldProps } from 'react-aria'

type TextInputProps = {} & AriaTextFieldProps

export const TextInput = (props: TextInputProps) => {
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
    <div style={{ display: 'flex', flexDirection: 'column', width: 200 }}>
      <label {...labelProps}>{props.label}</label>
      <input {...inputProps} ref={ref} />
      {props.description && (
        <div {...descriptionProps} style={{ fontSize: 12 }}>
          {props.description}
        </div>
      )}
      {isInvalid && (
        <div {...errorMessageProps} style={{ color: 'red', fontSize: 12 }}>
          {validationErrors.join(' ')}
        </div>
      )}
    </div>
  )
}

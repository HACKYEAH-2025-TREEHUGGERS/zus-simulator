import { ChevronDown } from 'lucide-react'
import { useLayoutEffect, useRef, useState } from 'react'
import {
  Select as AriaSelect,
  Button,
  FieldError,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  SelectValue,
  Text,
} from 'react-aria-components'
import { HelpTooltip } from './tooltip'
import type {
  ListBoxItemProps,
  SelectProps,
  ValidationResult,
} from 'react-aria-components'

interface MySelectProps<T extends object, TMode extends 'single' | 'multiple'>
  extends Omit<SelectProps<T, TMode>, 'children'> {
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  items?: Iterable<T>
  children: React.ReactNode | ((item: T) => React.ReactNode)
  tooltip?: string
}

export const Select = <
  T extends object,
  TMode extends 'single' | 'multiple' = 'single',
>({
  label,
  description,
  errorMessage,
  children,
  items,
  tooltip,
  ...props
}: MySelectProps<T, TMode>): React.ReactElement => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [buttonWidth, setButtonWidth] = useState(0)

  useLayoutEffect(() => {
    setButtonWidth(buttonRef.current?.offsetWidth ?? 0)
  }, [buttonRef.current?.offsetWidth])

  return (
    <AriaSelect {...props} className="flex flex-col w-full">
      <Label className="mb-2 flex items-center gap-1">
        {label}
        {props.isRequired ? <span className="text-warning">*</span> : null}
        {tooltip && <HelpTooltip text={tooltip} />}
      </Label>
      <Button
        ref={buttonRef}
        className="cursor-pointer flex gap-2 justify-between items-center w-full rounded-lg bg-input text-black px-4 py-3 text-base"
      >
        <SelectValue />
        <span aria-hidden="true">
          <ChevronDown size={16} />
        </span>
      </Button>
      {description && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
      <Popover
        className="bg-input animate-slide-down w-fit shadow-lg overflow-visible rounded z-10"
        style={{ width: buttonWidth }}
      >
        <ListBox items={items}>{children}</ListBox>
      </Popover>
    </AriaSelect>
  )
}

export const SelectItem = (props: ListBoxItemProps) => {
  return (
    <ListBoxItem
      {...props}
      className={({ isFocused, isSelected }) =>
        `cursor-pointer flex gap-1 px-3 py-1 my-1 mx-1 rounded ${isFocused ? 'bg-primary text-white' : ''} ${isSelected ? "before:content-['✓']" : ''}`
      }
    />
  )
}

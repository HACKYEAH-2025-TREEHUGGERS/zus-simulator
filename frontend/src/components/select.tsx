import { ChevronDown } from 'lucide-react'
import {
  Button,
  FieldError,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  SelectValue,
  Text,
} from 'react-aria-components'
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
  ...props
}: MySelectProps<T, TMode>): React.ReactElement => {
  return (
    <Select {...props}>
      <Label>{label}</Label>
      <Button>
        <SelectValue />
        <span aria-hidden="true">
          <ChevronDown size={16} />
        </span>
      </Button>
      {description && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
      <Popover>
        <ListBox items={items}>{children}</ListBox>
      </Popover>
    </Select>
  )
}

export const MyItem = (props: ListBoxItemProps) => {
  return (
    <ListBoxItem
      {...props}
      className={({ isFocused, isSelected }) =>
        `my-item ${isFocused ? 'focused' : ''} ${isSelected ? 'selected' : ''}`
      }
    />
  )
}

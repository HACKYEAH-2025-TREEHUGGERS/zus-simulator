import { Checkbox as AriaCheckbox } from 'react-aria-components'
import { HelpTooltip } from '../tooltip'
import type { CheckboxProps } from 'react-aria-components'
import { cn } from '@/helpers/cn'

type CheckboxComponentProps = Omit<CheckboxProps, 'children'> & {
  children?: React.ReactNode
  tooltip?: string
} & React.RefAttributes<HTMLLabelElement>

export const Checkbox = ({
  children,
  tooltip,
  className,
  ...props
}: CheckboxComponentProps) => {
  return (
    <AriaCheckbox {...props}>
      {({ isIndeterminate }) => (
        <div
          className={cn(
            'flex items-center gap-2 cursor-pointer select-none',
            className,
          )}
        >
          <div className="checkbox">
            <svg
              viewBox="0 0 18 18"
              aria-hidden="true"
              className="checkbox-check"
            >
              {isIndeterminate ? (
                <rect x={1} y={7.5} width={15} height={3} />
              ) : (
                <polyline points="1 9 7 14 15 4" />
              )}
            </svg>
          </div>
          {children}
          {tooltip && <HelpTooltip text={tooltip} />}
        </div>
      )}
    </AriaCheckbox>
  )
}

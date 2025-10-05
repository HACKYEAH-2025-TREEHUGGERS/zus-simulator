import { HelpCircle } from 'lucide-react'
import { Button, DialogTrigger, Popover } from 'react-aria-components'

export const Tooltip = ({ text }: { text: string }) => {
  return (
    <Popover
      placement="right"
      className="animate-fade-in max-w-[300px] text-center text-sm font-medium px-3 py-2 bg-white text-black shadow-xl rounded-lg"
    >
      {text}
    </Popover>
  )
}

export const HelpTooltip = ({ text }: { text: string }) => {
  return (
    <DialogTrigger>
      <Button aria-label="Help">
        <HelpCircle size={16} className="text-black/50 cursor-pointer" />
      </Button>
      <Tooltip text={text} />
    </DialogTrigger>
  )
}

export const LineChart = ({
  value,
  color,
}: {
  value: number
  color: string
}) => {
  return (
    <div className="w-full relative bg-background rounded-full overflow-hidden h-1">
      <div
        className="absolute h-1 left-0 rounded-full"
        style={{ width: `${value}%`, backgroundColor: color }}
      />
    </div>
  )
}

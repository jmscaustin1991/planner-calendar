
import { WeekView } from './WeekView'
export function DayView({ date }: { date: Date }) {
  // Simplify by reusing WeekView layout and visually focusing first column
  return <WeekView date={date} />
}

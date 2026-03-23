import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { createCalendarEvents, getHeavySpendingWeek } from './calendarUtils'

function CalendarView({ payables, weeklyExpenses }) {
  const events = createCalendarEvents(payables)
  const heavyWeek = getHeavySpendingWeek(weeklyExpenses)

  return (
    <div className="space-y-2">
      <p className="text-sm text-gray-400">
        Highest expense load: <span className="font-semibold text-brand-400">Week {heavyWeek}</span>
      </p>
      <div className="calendar-shell rounded-xl border border-brand-500/20 bg-black/35 p-2 shadow-lg shadow-black/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(138,43,226,0.15)]">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          height="auto"
          events={events}
          eventColor="#8a2be2"
        />
      </div>
    </div>
  )
}

export default CalendarView

import './styles.css'

import { Calendar as ReactCalendar, dateFnsLocalizer, SlotInfo } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import { useState } from 'react'

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

interface Event {
    title: string,
    start: Date,
    end: Date,
    allDay?: boolean
    resource?: any
}

const initialState: Event[] = [
  {
    title: 'Meg Shower',
    start: new Date(),
    end: new Date(),
  },
  {
    title: 'Clara Shower',
    start: new Date(),
    end: new Date(),
  },
  {
    title: 'Cindy haircut',
    start: new Date(),
    end: new Date(),
  }
]

const Calendar = () => {

  const onSelectSlot = (slotInfo: SlotInfo) => {
    const newEvent: Event = {
      title: 'Event',
      start: new Date(slotInfo.start),
      end: new Date(slotInfo.end)
    }
    setEvents([...events, newEvent])
  }

  const [events, setEvents] = useState<Event[]>(initialState)  
    
  return (
    <div className='calendar'>
      <ReactCalendar
        localizer={localizer}
        events={events}
        selectable={true}
        views={{
          day: true,
          week: true,
          month: true
        }}
        startAccessor="start"
        endAccessor="end"
        onSelectSlot={(slotInfo: SlotInfo) => onSelectSlot(slotInfo)}
      >
          
      </ReactCalendar>
    </div>
  );
}

export default Calendar
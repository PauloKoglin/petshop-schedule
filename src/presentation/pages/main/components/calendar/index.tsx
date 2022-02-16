import './styles.css'

import { Calendar as ReactCalendar, dateFnsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'

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

const Calendar = () => {
    
  return (
    <div className='calendar'>
      <ReactCalendar
        localizer={localizer}
        events={[]}
        views={{
          day: true,
          week: true,
          month: true
        }}
        startAccessor="start"
        endAccessor="end"
        // style={{height: '100%'}}
      >
          
      </ReactCalendar>
    </div>
  );
}

export default Calendar
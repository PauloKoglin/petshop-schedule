import './styles.css'
import ScheduleModal from '../../../../components/schedule-modal'

import { useState } from 'react'
import { Calendar as ReactCalendar, dateFnsLocalizer, SlotInfo, Event } from 'react-big-calendar'
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
    const [schedules] = useState<Event[]>([])  
    const [schedulerModalVisible, setEventModalVisible] = useState<boolean>(false)
    const [selectedSlot, setSelectedSlot] = useState<SlotInfo>()
  
    const onSelectSlot = (slotInfo: SlotInfo) => {
        setSelectedSlot(slotInfo)
        setEventModalVisible(true)
    }

    const getDefaultScheduleDate = (): Date => {
        return selectedSlot?.start ? new Date(selectedSlot.start) : new Date()
    }

    const onCloseScheduler = () => {
      setEventModalVisible(false)
    }

    const onScheduleSaved = () => {
      setEventModalVisible(false)
    }
    
    return (
        <div className='calendar'>
            <ReactCalendar
                localizer={localizer}
                events={schedules}
                selectable={true}
                views={{
                  day: true,
                  week: true,
                  month: true
                }}
                startAccessor="start"
                endAccessor="end"
                onSelectSlot={(slotInfo: SlotInfo) => onSelectSlot(slotInfo)}>
            </ReactCalendar>
            {
              schedulerModalVisible &&
              <ScheduleModal
                  onScheduleClose={onCloseScheduler} 
                  onScheduleSaved={onScheduleSaved}
                  defaultDate={getDefaultScheduleDate()}   
              />
            }
        </div>
    );
}

export default Calendar
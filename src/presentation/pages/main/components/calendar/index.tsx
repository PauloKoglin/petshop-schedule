import './styles.css'
import ScheduleModal from '../../../../components/schedule-modal'

import { useState } from 'react'
import { Calendar as ReactCalendar, SlotInfo, Event, DateLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

type CalendarProps = {
    localizer: DateLocalizer
}

const Calendar: React.FC<CalendarProps> = ({ localizer }: CalendarProps) => {
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
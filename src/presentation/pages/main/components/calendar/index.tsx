import './styles.css'
import ScheduleModal from '../../../../components/schedule-modal'

import { useState } from 'react'
import { Calendar as ReactCalendar, SlotInfo, Event, DateLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

type CalendarProps = {
    localizer: DateLocalizer
}

const Calendar: React.FC<CalendarProps> = ({ localizer }: CalendarProps) => {
    const [schedules, setSchedules] = useState<Event[]>([])  
    const [schedulerModalVisible, setEventModalVisible] = useState<boolean>(false)
    const [selectedSlot, setSelectedSlot] = useState<SlotInfo>()

    const onSelectSlot = (slotInfo: SlotInfo) => {
        const newSchedule: Event = {
          start: new Date(slotInfo.start),
          end: new Date(slotInfo.end)
        }
        setSchedules([...schedules, newSchedule])
        setSelectedSlot(slotInfo)
        setEventModalVisible(true)
    }

    const getDefaultScheduleDate = (): Date => {
        return selectedSlot?.start ? new Date(selectedSlot.start) : new Date()
    }

    const getDefaultScheduleStartTime = (): number => {
      return selectedSlot?.start ? new Date(selectedSlot.start).getTime() : new Date().getTime()
    }

    const getDefaultScheduleEndTime = (): number => {
      return selectedSlot?.end ? new Date(selectedSlot.end).getTime() : new Date().getTime()
    }

    const onCloseScheduler = () => {
      setEventModalVisible(false)
      setSchedules([])
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
                  week: true,
                  month: true
                }}
                startAccessor="start"
                endAccessor="end"
                onSelectSlot={(slotInfo: SlotInfo) => onSelectSlot(slotInfo)}
            >
            </ReactCalendar>
            {
              schedulerModalVisible &&
              <ScheduleModal
                  defaultDate={getDefaultScheduleDate()}
                  defaultStartTime={getDefaultScheduleStartTime()}
                  defaultEndTime={getDefaultScheduleEndTime()}
                  onScheduleClose={onCloseScheduler} 
                  onScheduleSaved={onScheduleSaved}
              />
            }
        </div>
    );
}

export default Calendar
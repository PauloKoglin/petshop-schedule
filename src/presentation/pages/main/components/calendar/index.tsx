import './styles.css'
import ScheduleModal from '../../../../components/schedule-modal'
import { Month } from '../../../../../domain/types/enums'
import { LoadSchedule, SaveSchedule } from '../../../../../domain/use-cases'

import { useEffect, useState } from 'react'
import { Calendar as ReactCalendar, SlotInfo, Event, DateLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

type CalendarProps = {
    localizer: DateLocalizer
    loadSchedule: LoadSchedule
    saveSchedule: SaveSchedule
}

const Calendar: React.FC<CalendarProps> = ({ localizer, loadSchedule, saveSchedule }: CalendarProps) => {
    const [schedules, setSchedules] = useState<Event[]>([])  
    const [schedulerModalVisible, setEventModalVisible] = useState<boolean>(false)
    const [selectedSlot, setSelectedSlot] = useState<SlotInfo>()

    useEffect(() => {
      loadSchedules()
    }, [])

    const loadSchedules = () => {
        loadSchedule
            .loadByMonth({ month: Month.february})
            .then(schedules => schedules && schedules.length > 0 && mapScheduleToCalendarEvent(schedules))
            .then(events => events && setSchedules(events))
    }

    const mapScheduleToCalendarEvent = (schedules: LoadSchedule.Model): Event[] => {
      return schedules.map(schedule => {
          const event: Event = {
            title: schedule.petName,
            start: schedule.startDate,
            end: schedule.endDate
          }
          return event
      })
    }

    const onSelectSlot = (slotInfo: SlotInfo) => {
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
    }

    const onScheduleSaved = () => {
      setEventModalVisible(false)
      loadSchedules()
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
                  saveSchedule={saveSchedule}
              />
            }
        </div>
    );
}

export default Calendar
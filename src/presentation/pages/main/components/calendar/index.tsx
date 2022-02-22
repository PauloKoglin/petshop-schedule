import './styles.css'
import ScheduleModal from '../../../../components/schedule-modal'
import { Month } from '../../../../../domain/types/enums'
import { Schedule } from '../../../../../domain/models'
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
    const [selectedEvent, setSelectedEvent] = useState<Event>()

    useEffect(() => {
      loadSchedules()
    }, [])

    useEffect(() => {
        if (selectedSlot) {
          setSelectedEvent(undefined)
        }
    }, [selectedSlot])

    useEffect(() => {
      if (selectedEvent) {
        setSelectedSlot(undefined)
      }
  }, [selectedEvent])

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

    const handleSelectSlot = (slotInfo: SlotInfo) => {
        setSelectedSlot(slotInfo)
        setEventModalVisible(true)
    }

    const handleSelectEvent = (event: Event) => {
        setSelectedEvent(event)
        setEventModalVisible(true)
    }

    const getSelectedSchedule = (): Schedule => {
        return {
            petName: selectedEvent?.title?.toString() ?? '',
            ownerName: '',
            startDate: new Date(selectedEvent?.start!),
            endDate: new Date(selectedEvent?.end!),
            services: []
        }
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
                onSelectSlot={(slotInfo: SlotInfo) => handleSelectSlot(slotInfo)}
                onSelectEvent={handleSelectEvent}
            >
            </ReactCalendar>
            {
              schedulerModalVisible &&
              <ScheduleModal
                  defaultDate={getDefaultScheduleDate()}
                  defaultStartTime={getDefaultScheduleStartTime()}
                  defaultEndTime={getDefaultScheduleEndTime()}
                  schedule={selectedEvent && getSelectedSchedule()}
                  onScheduleClose={onCloseScheduler} 
                  onScheduleSaved={onScheduleSaved}
                  saveSchedule={saveSchedule}
              />
            }
        </div>
    );
}

export default Calendar
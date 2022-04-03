/* eslint-disable react-hooks/exhaustive-deps */
import './styles.css'
import ScheduleModal from '../../../../components/schedule-modal'
import { Month } from '../../../../../domain/types/enums'
import { Schedule } from '../../../../../domain/models'
import { LoadSchedule, SaveSchedule } from '../../../../../domain/use-cases'
import { getMonthFromDate } from '../../../../utils'

import { useEffect, useState, useCallback } from 'react'
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
    const [selectedMonth, setSelectedMonth] = useState<Month>(getMonthFromDate(new Date()))
    const [selectedSlot, setSelectedSlot] = useState<SlotInfo>()
    const [selectedEvent, setSelectedEvent] = useState<Event>()

    useEffect(() => {
        loadSchedules()
    }, [selectedMonth])

    useEffect(() => {
        if (selectedSlot) {
          setSelectedEvent(undefined)
        }
        const temporaryEvent: Event = {
          title: 'new schedule',
          start: selectedSlot ? new Date(selectedSlot.start) : new Date(),
          end: selectedSlot ? new Date(selectedSlot.end) : new Date(),
        }
        setSchedules([...schedules, temporaryEvent])
    }, [selectedSlot])

    useEffect(() => {
      if (selectedEvent) {
        setSelectedSlot(undefined)
      }
    }, [selectedEvent])

    const loadSchedules = () => {
        loadSchedule
            .loadByMonth({ month: selectedMonth})
            .then(schedules => schedules && schedules.length > 0 && mapScheduleToCalendarEvent(schedules))
            .then(events => events && setSchedules(events))
    }

    const mapScheduleToCalendarEvent = (schedules: LoadSchedule.Model): Event[] => {
      return schedules.map(schedule => {
          const event: Event = {
            title: schedule.petName,
            start: schedule.startDate,
            end: schedule.endDate,
            resource: schedule
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

    const handleCalendarNavigate = (newDate: Date) => {
      const newMonth = getMonthFromDate(newDate)
        if (newMonth !== selectedMonth ) {
            setSelectedMonth(newMonth)
        }
    }

    const getSelectedSchedule = (): Schedule => {
        return {
            id: (selectedEvent?.resource as Schedule).id,
            petName: selectedEvent?.title?.toString() ?? '',
            ownerName: selectedEvent?.resource?.ownerName,
            startDate: new Date(selectedEvent?.start!),
            endDate: new Date(selectedEvent?.end!),
            services: selectedEvent?.resource.services
        }
    }

    const getDefaultScheduleStartDate = (): Date | undefined => {
      return selectedSlot?.start ? new Date(selectedSlot.start) : undefined
    }

    const getDefaultScheduleEndDate = (): Date | undefined => {
        return selectedSlot?.end ? new Date(selectedSlot.end) : undefined
    }

    const onCloseScheduler = () => {
      setEventModalVisible(false)
      const cleanedSchedules: Event[] = schedules.filter(event => event.resource)
      setSchedules(cleanedSchedules)
    }

    const onScheduleSaved = () => {
      setEventModalVisible(false)
      loadSchedules()
    }

    const eventPropGetter = useCallback(
      () => ({
        style: {
          backgroundColor: '#3B19',
          borderWidth: '0'
        },
      }),
      []
    )

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
                onNavigate={handleCalendarNavigate}
                eventPropGetter={eventPropGetter}
            >
            </ReactCalendar>
            {
              schedulerModalVisible &&
              <ScheduleModal
                  defaultStartDate={getDefaultScheduleStartDate()}
                  defaultEndDate={getDefaultScheduleEndDate()}
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
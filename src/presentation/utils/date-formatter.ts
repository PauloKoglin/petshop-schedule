import { Month } from '../../domain/types/enums'

import fnsFormat from 'date-fns/format'

export const formatDate = (date: Date): string => {
    return fnsFormat(date, 'yyyy-MM-dd')
}

export const formatTime = (time: number): string => {
    return fnsFormat(time, 'HH:mm')    
}

export const setTimeStringToDate = (date: Date, time: string): number => {
    if (!time) {
        throw new Error('Invalid time string.')
    }
    const [hours, minutes]: string[] = time.split(':')
    date.setHours(Number(hours), Number(minutes))
    return date.getTime()
}

export const getMonthFromDate = (date: Date): Month => {
    return date.getMonth() + 1
}
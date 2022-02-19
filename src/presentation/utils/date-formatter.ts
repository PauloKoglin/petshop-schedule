import fnsFormat from 'date-fns/format'

export const formatDate = (date: Date): string => {
    return fnsFormat(date, 'yyyy-MM-dd')
}

export const formatTime = (time: number): string => {
    return fnsFormat(time, 'HH:mm')    
}
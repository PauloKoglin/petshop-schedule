import { formatDate, formatTime, setTimeStringToDate } from "./date-formatter"

describe('date-formatter', () => {
    it('should return date in format of yyyy-MM-dd', () => {
        const result: String = formatDate(new Date('11-25-2022'))
        
        expect(result).toBe('2022-11-25')
    })

    it('should return time in format of hh:mm', () => {        
        const time = new Date('2022-01-01 10:30')

        const result: String = formatTime(time.getTime())

        expect(result).toBe('10:30')
    })

    it('should return time from the given string time', () => {        
        const input = '10:30'
        const time = new Date()
        time.setHours(10)
        time.setMinutes(30)

        const result: number = setTimeStringToDate(new Date(), input)

        expect(result).toBe(time.getTime())
    })

    it('should throw if given string time is empty', () => {
        expect(() => setTimeStringToDate(new Date(), '')).toThrow()
    })
})

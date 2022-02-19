import { formatDate, formatTime } from "./date-formatter"

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
})

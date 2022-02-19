import { formatDate } from "./date-formatter"

describe('date-formatter', () => {
    it('should return date in format of yyyy-MM-dd', () => {
        const result: String = formatDate(new Date('11-25-2022'))
        expect(result).toBe('2022-11-25')
    })
})
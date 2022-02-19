import fnsFormat from 'date-fns/format'

const formatDate = (date: Date): string => {
    return fnsFormat(date, 'yyyy-MM-dd')
}

describe('date-formatter', () => {
    it('should return date in format of yyyy-MM-dd', () => {
        const result: String = formatDate(new Date('11-25-2022'))
        expect(result).toBe('2022-11-25')
    })
})
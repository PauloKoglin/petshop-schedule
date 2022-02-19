import { SaveSchedule } from "../../domain/use-cases"
import { mock, MockProxy } from 'jest-mock-extended'

interface Cache {
    set: (field: string, value: Object) => void
}

class SaveScheduleInCache implements SaveSchedule {
    private static fieldName: string = 'schedules'

    constructor (private readonly cache: Cache) {}

    public perform(input: SaveSchedule.Input): Promise<SaveSchedule.Model> {
        this.cache.set(SaveScheduleInCache.fieldName, input)
        return Promise.resolve(input)
    }    
}

describe('SaveScheduleInCache', () => {
    let sut: SaveSchedule
    let cacheMock: MockProxy<Cache>

    beforeEach(() => {
        cacheMock = mock()
        sut = new SaveScheduleInCache(cacheMock)
    })

    it('should call Cache with given input', async () => {        
        const input: SaveSchedule.Input = {
            petName: 'any_value',
            ownerName: 'any_value',
            startDate: new Date(),
            endDate: new Date(),
            services: []
        }

        await sut.perform(input)

        expect(cacheMock.set).toBeCalledTimes(1)
        expect(cacheMock.set).toBeCalledWith('schedules', input)
    })
})
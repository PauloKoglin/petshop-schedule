import { LoadSchedule, SaveSchedule } from "../../../domain/use-cases"
import { SaveScheduleInCache } from ".."
import { CacheStorage } from '../../contracts'

import { mock, MockProxy } from 'jest-mock-extended'

describe('SaveScheduleInCache', () => {
    let sut: SaveSchedule
    let cacheMock: MockProxy<CacheStorage>
    let loadScheduleMock: MockProxy<LoadSchedule>

    beforeEach(() => {
        cacheMock = mock()
        loadScheduleMock = mock()
        loadScheduleMock.loadAll.mockResolvedValue([])
        sut = new SaveScheduleInCache(cacheMock, loadScheduleMock)
    })

    it('should call cache get once', async () => {
        const input: SaveSchedule.Input = {
            petName: 'any_value',
            ownerName: 'any_value',
            startDate: new Date(),
            endDate: new Date(),
            services: []
        }

        await sut.perform(input)

        expect(loadScheduleMock.loadAll).toBeCalledTimes(1)
    })
})
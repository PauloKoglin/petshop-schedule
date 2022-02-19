import { SaveSchedule } from "../../domain/use-cases"
import { SaveScheduleInCache } from "."
import { CacheStorage } from '../contracts'

import { mock, MockProxy } from 'jest-mock-extended'

describe('SaveScheduleInCache', () => {
    let sut: SaveSchedule
    let cacheMock: MockProxy<CacheStorage>

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
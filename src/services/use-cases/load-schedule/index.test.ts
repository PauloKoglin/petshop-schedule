import { LoadSchedule } from '../../../domain/use-cases'
import { Month, ScheduleService } from '../../../domain/types/enums'
import { Schedule } from '../../../domain/models'
import { LoadScheduleFromCache } from '.'
import { CacheStorage } from '../../contracts'

import { mock, MockProxy } from 'jest-mock-extended'

describe('LoadScheduleFromCache', () => {
    let sut: LoadSchedule
    let cacheMock: MockProxy<CacheStorage>

    beforeEach(() => {
        cacheMock = mock()
        sut = new LoadScheduleFromCache(cacheMock)
    })

    it('should return only schedules from given month', async () => {
        const januarySchedule: Schedule = {
            petName: 'any_name',
            ownerName: 'any_owner',
            startDate: new Date('2022-01-15'),
            endDate: new Date('2022-01-15'),
            services: [ ScheduleService.shear ]
        }
        const februarySchedule: Schedule = {
            petName: 'any_name',
            ownerName: 'any_owner',
            startDate: new Date('2022-02-23'),
            endDate: new Date('2022-02-23'),
            services: [ ScheduleService.shower ]
        }
        cacheMock.get.mockReturnValueOnce([januarySchedule, februarySchedule])

        const result: LoadSchedule.Model = await sut.loadByMonth({ month: Month.february })

        expect(result).toHaveLength(1)
        expect(result[0]).toEqual(februarySchedule)
    })

    it('should return empty when cache returns empty', async () => {
        cacheMock.get.mockReturnValueOnce([])

        const result: LoadSchedule.Model = await sut.loadByMonth({ month: Month.january })

        expect(result).toHaveLength(0)
    })

    it('should return empty when cache returns undefined', async () => {
        cacheMock.get.mockReturnValueOnce(undefined)

        const result: LoadSchedule.Model = await sut.loadByMonth({ month: Month.january })

        expect(result).toHaveLength(0)
    })
})
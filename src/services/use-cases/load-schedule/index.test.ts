import { LoadSchedule } from '../../../domain/use-cases'
import { Month } from '../../../domain/types/enums'

import { mock, MockProxy } from 'jest-mock-extended'
import { Schedule, ScheduleService } from '../../../domain/models'
import { CacheStorage } from '../../contracts'

class LoadScheduleFromCache implements LoadSchedule {

    constructor (private readonly cache: CacheStorage) {}

    public loadByMonth(input: LoadSchedule.Input): Promise<LoadSchedule.Model> {
        const cacheResult: any = this.cache.get('schedules')
        let schedules: LoadSchedule.Model = [...cacheResult]
        schedules = schedules.filter(schedule => schedule.startDate.getMonth() + 1 === input.month)
        return Promise.resolve(schedules)
    }    
}

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
})
import { Schedule } from '../../../domain/models'
import { LoadSchedule } from '../../../domain/use-cases'
import { CacheStorage } from '../../contracts'

export class LoadScheduleFromCache implements LoadSchedule {

    constructor (private readonly cache: CacheStorage) {}

    public loadByMonth(input: LoadSchedule.Input): Promise<LoadSchedule.Model> {
        const cacheResult: any = this.cache.get('schedules')
        let schedules: LoadSchedule.Model = []
        if (cacheResult) {
            schedules = [...cacheResult].map(value => this.mapToSchedule(value))
            schedules = schedules.filter(schedule => schedule.startDate.getMonth() + 1 === input.month)            
        }
        return Promise.resolve(schedules)
    }

    private mapToSchedule(value: any): Schedule {
        return {
            petName: value.petName,
            ownerName: value.ownerName,
            startDate: new Date(value.startDate),
            endDate: new Date(value.endDate),
            services: value.services
        }
    }

    public loadAll(): Promise<LoadSchedule.Model> {
        const cacheResult: any = this.cache.get('schedules')
        let schedules: LoadSchedule.Model = []
        if (cacheResult) {
            schedules = [...cacheResult]
        }
        return Promise.resolve(schedules)
    }
}
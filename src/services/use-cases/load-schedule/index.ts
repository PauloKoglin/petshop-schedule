import { LoadSchedule } from '../../../domain/use-cases'
import { CacheStorage } from '../../contracts'

export class LoadScheduleFromCache implements LoadSchedule {

    constructor (private readonly cache: CacheStorage) {}

    public loadByMonth(input: LoadSchedule.Input): Promise<LoadSchedule.Model> {
        const cacheResult: any = this.cache.get('schedules')
        let schedules: LoadSchedule.Model = []
        if (cacheResult) {
            schedules = [...cacheResult]
            schedules = schedules.filter(schedule => schedule.startDate.getMonth() + 1 === input.month)            
        }
        return Promise.resolve(schedules)
    }    
}
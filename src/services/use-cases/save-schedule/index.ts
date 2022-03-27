import { LoadSchedule, SaveSchedule } from "../../../domain/use-cases"
import { Guid } from "../../../domain/use-cases/guid"
import { CacheStorage } from "../../contracts"

export class SaveScheduleInCache implements SaveSchedule {
    private static fieldName: string = 'schedules'

    constructor (
        private readonly cache: CacheStorage,
        private readonly loadSchedule: LoadSchedule,
        private readonly guid: Guid
    ) {}

    public async perform(input: SaveSchedule.Input): Promise<SaveSchedule.Model> {
        let schedules: LoadSchedule.Model = await this.loadSchedule.loadAll()
        let newSchedule: SaveSchedule.Input
        let id: string = '';
        if (!input.id) {
            id = this.guid.generate()
            newSchedule = {
                ...input,
                id
            }
    
            schedules.push(newSchedule)
        } else {
            id = input.id
            newSchedule = input
            schedules = schedules.map(schedule => {
                if (schedule.id === id) {
                    return input
                }
                return schedule
            })
        }
        
        this.cache.set(SaveScheduleInCache.fieldName, schedules)
        return Promise.resolve(newSchedule)
    }    
}
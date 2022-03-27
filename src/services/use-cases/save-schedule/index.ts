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
        if (!input.id) {
            newSchedule = {
                ...input,
                id: this.guid.generate()
            }
            schedules.push(newSchedule)
        } else {
            newSchedule = input
            schedules = schedules.map(schedule => schedule.id === input.id ? input : schedule)
        }
        
        this.cache.set(SaveScheduleInCache.fieldName, schedules)
        return Promise.resolve(newSchedule)
    }    
}
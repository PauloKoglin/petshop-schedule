import { LoadSchedule, SaveSchedule } from "../../../domain/use-cases"
import { CacheStorage } from "../../contracts"

export class SaveScheduleInCache implements SaveSchedule {
    private static fieldName: string = 'schedules'

    constructor (
        private readonly cache: CacheStorage,
        private readonly loadSchedule: LoadSchedule
    ) {}

    public async perform(input: SaveSchedule.Input): Promise<SaveSchedule.Model> {
        let schedules: LoadSchedule.Model = await this.loadSchedule.loadAll()
        schedules.push(input)
        this.cache.set(SaveScheduleInCache.fieldName, schedules)
        return Promise.resolve(input)
    }    
}
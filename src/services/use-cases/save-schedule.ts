import { SaveSchedule } from "../../domain/use-cases"
import { CacheStorage } from "../contracts"

export class SaveScheduleInCache implements SaveSchedule {
    private static fieldName: string = 'schedules'

    constructor (private readonly cache: CacheStorage) {}

    public perform(input: SaveSchedule.Input): Promise<SaveSchedule.Model> {
        this.cache.set(SaveScheduleInCache.fieldName, input)
        return Promise.resolve(input)
    }    
}
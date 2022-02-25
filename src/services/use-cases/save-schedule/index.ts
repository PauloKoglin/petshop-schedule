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
        const id: string = this.guid.generate()

        let schedules: LoadSchedule.Model = await this.loadSchedule.loadAll()

        const newSchedule: SaveSchedule.Input = {
            ...input,
            id
        }

        schedules.push(newSchedule)
        this.cache.set(SaveScheduleInCache.fieldName, schedules)
        return Promise.resolve(newSchedule)
    }    
}
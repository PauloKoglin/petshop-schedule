import { Schedule, ScheduleService } from "../models";

export interface SaveSchedule {
    perform: (input: SaveSchedule.Input) => Promise<SaveSchedule.Model>
}

export namespace SaveSchedule {
    export type Input = {
        petName: string,
        ownerName: string,
        startDate: Date,
        endDate: Date,
        services: ScheduleService[]
    }

    export type Model = Schedule
}
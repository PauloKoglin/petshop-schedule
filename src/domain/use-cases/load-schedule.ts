import { Schedule } from "../models";
import { Month } from "../types/enums";

export interface LoadSchedule {
    loadByMonth: (input: LoadSchedule.Input) => Promise<LoadSchedule.Model>
    loadAll: () => Promise<LoadSchedule.Model>
}

export namespace LoadSchedule {
    export type Input = {
        month: Month
    }

    export type Model = Schedule[]
}
import { ScheduleService } from "../types/enums";

export interface Schedule {
    id?: string,
    petName: string,
    ownerName: string,
    startDate: Date,
    endDate: Date,
    services: ScheduleService[]
}
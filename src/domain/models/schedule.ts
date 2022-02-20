import { ScheduleService } from "../types/enums";

export interface Schedule {
    petName: string,
    ownerName: string,
    startDate: Date,
    endDate: Date,
    services: ScheduleService[]
}
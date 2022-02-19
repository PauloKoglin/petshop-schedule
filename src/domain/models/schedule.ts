import { ScheduleService } from "../types/enums";

export interface Schedule {
    petName: string,
    ownerName: String,
    startDate: Date,
    endDate: Date,
    services: ScheduleService[]
}
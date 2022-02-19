import { ScheduleService } from "./schedule-service";

export interface Schedule {
    petName: string,
    ownerName: String,
    startDate: Date,
    endDate: Date,
    services: ScheduleService[]
}
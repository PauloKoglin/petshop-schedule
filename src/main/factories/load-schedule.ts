import { makeLocalstorageCache } from "."
import { LoadSchedule } from "../../domain/use-cases"
import { LoadScheduleFromCache } from "../../services/use-cases"

type Output = LoadSchedule

export const makeLoadSchedule = (): Output => {
    return new LoadScheduleFromCache(
        makeLocalstorageCache()
    )
}
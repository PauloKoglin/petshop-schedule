import { makeLoadSchedule, makeLocalstorageCache } from ".";
import { SaveSchedule } from "../../domain/use-cases";
import { SaveScheduleInCache } from "../../services/use-cases";

type Output = SaveSchedule

export const makeSaveSchedule = (): Output => {
    return new SaveScheduleInCache(
        makeLocalstorageCache(),
        makeLoadSchedule()
    )
}
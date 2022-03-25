import { Guid } from "../../domain/use-cases/guid";
import { RandomGuid } from '../../infra/random-guid'

export const makeRandomGuid = (): Guid => {
    return new RandomGuid()
}
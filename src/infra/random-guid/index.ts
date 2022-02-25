import { Guid } from "../../domain/use-cases/guid"

import { randomUUID } from "crypto"

export class RandomGuid implements Guid {
    public generate(): string {
        return randomUUID()
    }
}
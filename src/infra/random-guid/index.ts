import { Guid } from '../../domain/use-cases/guid'

import { v4 } from 'uuid'

export class RandomGuid implements Guid {
    public generate(): string {
        return v4()
    }
}
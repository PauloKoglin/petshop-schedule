import { Guid } from "../../domain/use-cases/guid"
import { RandomGuid } from "."

describe('guid-generator', () => {

    it('should generate different guids', () => {
        const sut: Guid = new RandomGuid()

        const generateResult1 = sut.generate()
        const generateResult2 = sut.generate()

        expect(generateResult1).not.toBe(generateResult2)
    })

})
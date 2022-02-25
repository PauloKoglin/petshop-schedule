import { randomUUID } from "crypto"

interface Guid {
    generate: () => string
}

class GuidGenerator implements Guid {
    public generate(): string {
        return randomUUID()
    }
}

describe('guid-generator', () => {

    it('should generate different guids', () => {
        const sut: GuidGenerator = new GuidGenerator()

        const generateResult1 = sut.generate()
        const generateResult2 = sut.generate()

        expect(generateResult1).not.toBe(generateResult2)
    })

})
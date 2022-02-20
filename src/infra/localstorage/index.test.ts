import { LocalStorage } from "."

describe('LocalStorage', () => {
    let sut: LocalStorage

    beforeEach(() => {
        sut = new LocalStorage()
    })

    it('should save to browser localstorage', () => {        
        const value: any = { attribute1: 'attr1', attribute2: 'attr2'}

        sut.set('any_key', value)

        const localstorageValue = window.localStorage.getItem('any_key')
        expect(localstorageValue ? JSON.parse(localstorageValue) : undefined).toEqual(value)
    })

    it('should save to browser localstorage when empty string is provided', () => {        
        const value: any = ''

        sut.set('any_key', value)

        const localstorageValue = window.localStorage.getItem('any_key')
        expect(localstorageValue ? JSON.parse(localstorageValue) : undefined).toEqual(value)
    })

    it('should get value from localstorage', () => {     
        const value: any = { attribute1: 'attr1', attribute2: 'attr2'}   
        window.localStorage.setItem('any_key', JSON.stringify(value)) 

        const result: any = sut.get('any_key')

        expect(result).toEqual(value)
    })

    it('should return undefined when key is not found', () => {     
        const value: any = { attribute1: 'attr1', attribute2: 'attr2'}   
        window.localStorage.setItem('any_key', JSON.stringify(value)) 

        const result: any = sut.get('any_value')

        expect(result).toBeUndefined()
    })
})
import { CacheStorage } from '../../services/contracts'

class LocalStorage implements CacheStorage {
    public set(field: string, value: Object) {
        window.localStorage.setItem(field, JSON.stringify(value))
    }
}

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
})
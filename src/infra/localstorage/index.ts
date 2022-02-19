import { CacheStorage } from '../../services/contracts'

export class LocalStorage implements CacheStorage {
    
    public set(field: string, value: Object) {
        window.localStorage.setItem(field, JSON.stringify(value))
    }

    public get(field: string): Object | undefined {
        const value: any = window.localStorage.getItem(field)
        return value ? JSON.parse(value) : undefined
    }
}
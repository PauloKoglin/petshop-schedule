import { CacheStorage } from '../../services/contracts'

export class LocalStorage implements CacheStorage {
    public set(field: string, value: Object) {
        window.localStorage.setItem(field, JSON.stringify(value))
    }
}
export interface CacheStorage {
    set: (field: string, value: Object) => void
    get: (field: string) => Object
}
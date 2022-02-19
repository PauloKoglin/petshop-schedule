import { LocalStorage } from "../../infra/localstorage"
import { CacheStorage } from "../../services/contracts"

type Output = CacheStorage

export const makeLocalstorageCache = (): Output => {
    return new LocalStorage()
}
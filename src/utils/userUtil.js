import { NameStorage } from "../Constants/Index"

export const isLoginUser = () => {
    return window.localStorage.getItem(NameStorage.USERID)
}
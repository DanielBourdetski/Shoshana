import { Opt, OptNoErr, resErrNon, resOk } from "./optionals"


export type AdminUser = {
    id: string,
    username: string,
    password: string
}

export function getAdminByUsername(username: string) : OptNoErr<AdminUser> {

    return resErrNon();
    
}
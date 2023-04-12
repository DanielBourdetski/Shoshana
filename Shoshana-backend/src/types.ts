
export enum UserType {
    Admin = 69,
    Business = 420
}

export type JWTToken = {
    userType : UserType;
}

interface AdminUser {
    id : string;
    username : string;
    password : string;
}

interface Business {
    id : string;
}

interface BusinessUser {
    id : string;
    username : string;
    password : string;
    businessId : string;
}
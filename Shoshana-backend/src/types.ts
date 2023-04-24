export enum UserType {
    Admin = 69,
    Business = 420
}

export type JWTToken = {
    userId : string;
    userType : UserType;
}
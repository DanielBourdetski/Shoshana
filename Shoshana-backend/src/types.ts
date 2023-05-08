import { ObjectId } from "mongodb";

export enum UserType {
    Admin = 69,
    Business = 420
}

export type JWTToken = {
    userId: string;
    userType: UserType;
}

export type AppointmentDate = {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    hourDiff: number;
    minuteDiff: number;
}

export type Appointment = {
    title: string;
    description: string;
    author: string;
    date: AppointmentDate;
}

export type Business = {
    userId : ObjectId;
    name : string;
    appoinments : Appointment[];
}
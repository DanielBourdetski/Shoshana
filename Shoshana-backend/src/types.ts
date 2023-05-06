import { ObjectId } from "mongodb";

export enum UserType {
    Admin = 6,
    Business = 42
}

export type JWTToken = {
    userId: string;
    userType: UserType;
}

export type AppointmentDate = {
    _id: ObjectId;
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    hourDiff: number;
    minuteDiff: number;
}

export type Appointment = {
    _id: ObjectId;
    title: string;
    description: string;
    author: string;
    date: AppointmentDate;
}

export type BusinessAppointments = {[key: string] : Appointment[]}

export type Business = {
    userId : ObjectId;
    name : string;
    appoinments : BusinessAppointments;
}
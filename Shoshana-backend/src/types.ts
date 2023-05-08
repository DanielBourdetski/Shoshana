import { ObjectId, WithId } from "mongodb";

export enum UserType {
	Admin = 69,
	Business = 420,
}

export type JWTToken = {
	userId: string;
	businessId: string;
	userType: UserType;
};

export type User = WithId<{
	username: string;
	password: string;
	email: string;
	name: string;
	userType: UserType;
}>;

export type AppointmentDate = {
	year: number;
	month: number;
	day: number;
	hour: number;
	minute: number;
	hourDiff: number;
	minuteDiff: number;
};

export type Appointment = {
	title: string;
	description: string;
	author: string;
	date: AppointmentDate;
};

export type Business = WithId<{
	ownerId: ObjectId;
	businessName: string;
	address: string;
	phoneNumber: {
		private: string;
		public: string;
	};
	appointments: Appointment[];
	logo: ObjectId;
}>;

export type Image = WithId<{
	data: Uint8Array;
}>;

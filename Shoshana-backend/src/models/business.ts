import mongoose, { ObjectId } from "mongoose";
import { appointmentSchema } from "./appointment";
import { Appointment } from "../types";

export interface IBusiness extends mongoose.Document {
	username: string;
	password: string;
	name: {
		first: string;
		last: string;
	};
	address: string;
	businessName: string;
	phoneNumbers: { private: string; business: string };
	logo: string;
	isAdmin: boolean;
	date: Date;
	fullName: string;
	appointments: string[];
}

const businessSchema = new mongoose.Schema(
	{
		username: String,
		password: String,
		name: {
			first: String,
			last: String,
		},
		address: String,
		description: String,
		businessName: String,
		phoneNumbers: { private: String, business: String },
		logo: String,
		isAdmin: Boolean,
		date: { type: Date, default: Date.now },
		appointments: [appointmentSchema],
	},
	{
		virtuals: {
			fullName: {
				get() {
					return `${this.name?.first} ${this.name?.last}`;
				},
			},
		},
	}
);

const Business = mongoose.model<IBusiness>("business", businessSchema);

export default Business;

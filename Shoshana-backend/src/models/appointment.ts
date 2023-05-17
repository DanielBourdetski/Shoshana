import mongoose from "mongoose";
import { AppointmentDate } from "../types";

export interface IAppointment extends mongoose.Document {
	title: string;
	description: string;
	client: string;
	date: AppointmentDate;
	notes: string;
	contactNumber: string;
	businessId: string;
}

// TODO add Appointment[] to business model
export const appointmentSchema = new mongoose.Schema({
	title: String,
	description: String,
	client: String,
	date: {
		year: Number,
		month: Number,
		day: Number,
		hour: Number,
		minute: Number,
		hourDiff: Number,
		minuteDiff: Number,
	},
	notes: String,
	contactNumber: String,
	businessId: String,
});

const Appointment = mongoose.model("appointment", appointmentSchema);

export default Appointment;

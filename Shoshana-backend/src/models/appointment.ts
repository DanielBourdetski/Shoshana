import mongoose from "mongoose";
import { AppointmentDate } from "../types";

export interface IAppointment extends mongoose.Document {
	title: string;
	description: string;
	client: string;
	date: AppointmentDate;
	notes: string;
	contactNumber: string;
}

// TODO add Appointment[] to business model
const schema = new mongoose.Schema({
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
});

const Appointment = mongoose.model("appointment", schema);

export default Appointment;

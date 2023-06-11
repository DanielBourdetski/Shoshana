import { Request, Router } from "express";
import { ExtendedRequest, auth } from "../middleware/auth";
import Appointment, { IAppointment } from "../models/appointment";
import Business from "../models/business";
import { z } from "zod";
import { mockApps } from "../mock/mockApps";
const router = Router();

// ? get all appointments of logged business /
router.get("/", auth, (req: ExtendedRequest, res) => {
	// ! mock data **********
	return res.send(mockApps);

	const apts = req.business?.appointments;

	if (!apts || !apts?.length) return res.send("No Appointments");

	res.json(req.business?.appointments);
});

// ? get certain appointment
router.get("/:id", auth, async (req: ExtendedRequest, res) => {
	try {
		const apts = req.business?.appointments;

		if (!apts || !apts.length) return res.send("No Appointments");

		if (!apts.includes(req.params.id))
			return res.status(404).send("Invalid Apointment ID");

		const requestedApt = await Appointment.findById(
			req.params.id,
			"-businessId -__v"
		).lean();

		if (!requestedApt) return res.status(404).send("Invalid Apointment ID");

		console.log(requestedApt);

		res.json(requestedApt);
	} catch (err) {
		res.status(500).send("Unexpected Server Error");
	}
});

router.get("/by-business-id/:id", auth, async (req, res) => {
	const businessId = req.params.id;

	if (!businessId) return res.status(400).send("No ID provided");

	try {
		const business = await Business.findById(businessId);

		if (!business) return res.status(400).send("Invalid business ID");

		const appointments = await Appointment.find()
			.where("_id")
			.in(business.appointments)
			.lean()
			.exec();

		res.send(appointments);
	} catch (err: any) {
		console.log(err);
		res.status(500).send(err.message);
	}
});

// ? create new appointment
const appointmentSchema = z.object({
	title: z.string(),
	description: z.string(),
	client: z.string(),
	date: z.object({
		year: z.number(),
		month: z.number(),
		day: z.number(),
		hour: z.number(),
		minute: z.number(),
	}),
	notes: z.string(),
	contactNumber: z.string(),
});

router.post("/", auth, async (req: ExtendedRequest, res) => {
	try {
		const validatedApt = appointmentSchema.parse(req.body);

		const newApt = new Appointment({
			...validatedApt,
			businessId: req.business?._id.toString(),
		});

		req.business?.appointments.push(newApt._id.toString());

		const businessInstance = await Business.findById(req.business?._id);
		businessInstance?.appointments.push(newApt._id.toString());

		await businessInstance?.save();
		await newApt.save();

		res.json(newApt);
	} catch (error) {
		console.error(error);
		res.status(400).send("Invalid Data");
	}
});

// ? update appointment
// TODO test
router.put("/:id", async (req: ExtendedRequest, res) => {
	const aptId = req.params.id;

	if (!req.business?.appointments.includes(aptId))
		return res.status(400).send("Invalid Id");

	const updatedAptData = req.body;

	try {
		const appointment = await Appointment.findById(aptId);
		if (!appointment) {
			// If appointment doesn't exist, remove it from business.appointments
			const business = req.business;
			if (business) {
				business.appointments = business.appointments.filter(
					(apt) => apt.toString() !== aptId
				);
				await business.save();
			}
			return res.status(400).send("Invalid Id");
		}

		console.log(appointment);
	} catch (err: any) {}
});

// ? cancel an appointment, will leave it in the database
router.delete("/:id", (req: ExtendedRequest, res) => {});

// ? delete an appointment completely (from history)
router.delete("/perma/:id", (req: ExtendedRequest, res) => {});

export default router;

import { Request, Router } from "express";
import { ExtendedRequest, auth } from "../middleware/auth";
import { Business as BusinessType } from "../types";
import Appointment, { IAppointment } from "../models/appointment";
import Business from "../models/business";
const router = Router();

// ? get all appointments of logged business /
router.get("/", auth, (req: ExtendedRequest, res) => {
	const apts = req.business?.appointments;

	if (!apts || !apts.length) return res.send("No Appointments");

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

// ? create new appointment
router.post("/", auth, async (req: ExtendedRequest, res) => {
	const apt = req.body;

	const newApt = new Appointment({
		...apt,
		businessId: req.business?._id.toString(),
	});

	req.business?.appointments.push(newApt._id.toString());

	const businessInstance = await Business.findById(req.business?._id);
	businessInstance?.appointments.push(newApt._id.toString());

	console.log(businessInstance?.appointments);

	await businessInstance?.save();
	await newApt.save();

	res.json(newApt);
});

// ? update appointment
router.put("/:id", (req: ExtendedRequest, res) => {});

// ? cancel an appointment, will leave it in the database
router.delete("/:id", (req: ExtendedRequest, res) => {});

// ? delete an appointment completely (from history)
router.delete("/perma/:id", (req: ExtendedRequest, res) => {});

export default router;

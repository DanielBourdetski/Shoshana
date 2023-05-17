import { Request, Router } from "express";
import { auth } from "../middleware/auth";
import { Business } from "../types";
import Appointment, { IAppointment } from "../models/appointment";
const router = Router();

type ExtendedRequest = Request & {
	business?: Business; // Add the business property to the ExtendedRequest type
};

// ? get all appointments of logged business /
router.get("/", auth, (req: ExtendedRequest, res) => {
	const apts = req.business?.appointments;

	if (!apts || !apts.length) return res.send("No Appointments");

	res.json(req.business?.appointments);
});

// ? get certain appointment
router.get("/:id", (req: ExtendedRequest, res) => {
	const apts = req.business?.appointments;

	if (!apts || !apts.length) return res.send("No Appointments");

	console.log(apts[0]);
	res.json(apts);
});

// ? create new appointment
router.post("/", auth, async (req: ExtendedRequest, res) => {
	const apt = req.body;

	const newApt = new Appointment({
		...apt,
		businessId: req.business?._id.toString(),
	});
	console.log("apt:", newApt);

	await newApt.save();
	res.json(newApt);
});

// ? update appointment
router.put("/:id", (req: ExtendedRequest, res) => {});

// ? cancel an appointment, will leave it in the database
router.delete("/:id", (req: ExtendedRequest, res) => {});

// ? delete an appointment completely
router.delete("/perma/:id", (req: ExtendedRequest, res) => {});

export default router;

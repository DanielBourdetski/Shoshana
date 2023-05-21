import { Router } from "express";
// import { createAuthMiddleware } from "../middleware/auth";
import { UserType } from "../types";
import { ExtendedRequest, auth } from "../middleware/auth";
import Business from "../models/business";

let router = Router();

// ! TODO remove private phone number from all calls, add censored number to get own business data

router.get("/", auth, (req: ExtendedRequest, res) => {
	console.log(req.business);
	res.json(req.business);
});

router.get("/:id", async (req, res) => {
	const businessId = req.params.id;

	try {
		const business = await Business.findById(
			businessId,
			"-date -__v"
		).lean();

		if (!business) return res.status(404).send("Invalid Business ID");

		return res.send(business);
	} catch (err) {}
});

// ? updates all data beside private phone
router.put("/", (req, res) => {});

// ? updates just private phone
router.put("/private-phone", (req, res) => {});

router.get("/icon/:id", (req, res) => {});

export default router;

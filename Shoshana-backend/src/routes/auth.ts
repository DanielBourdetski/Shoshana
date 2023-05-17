import { Router } from "express";
import { generateJWTToken } from "../jwt";
import { z } from "zod";
import Business from "../models/business";

const router = Router();

export enum RegisterError {
	Unknown = "Unexpected Server Error",
	InvalidInfo = "Invalid Info",
	UsernameTaken = "Username Taken",
	EmailTaken = "Email Taken",
}

export const registerValidationScheme = z.object({
	username: z.string().min(3).max(50),

	password: z.string().min(8).max(50),
	email: z.string(),
	name: z.object({
		first: z.string(),
		last: z.string(),
	}),
	businessName: z.string(),
	address: z.string(),
	phoneNumbers: z.object({ private: z.string(), public: z.string() }),
	logo: z.string(),
});

router.post("/register", async (req, res) => {
	// console.log(req.body);

	let registerData = registerValidationScheme.safeParse(req.body);

	if (!registerData.success) {
		console.log(registerData.error.formErrors);

		return res.status(422).send(RegisterError.InvalidInfo);
	}

	const existingUsername = await Business.findOne({
		username: registerData.data.username,
	});

	if (existingUsername) {
		return res.status(409).send(RegisterError.UsernameTaken);
	}

	const existingEmail = await Business.findOne({
		email: registerData.data.email,
	});

	if (existingEmail) {
		return res.status(409).send(RegisterError.EmailTaken);
	}

	try {
		const business = new Business(registerData.data);
		await business.save();

		if (!business.username)
			throw new Error(
				"Unexpected: no username on saved business on database"
			);

		return res.status(201).send({
			token: generateJWTToken({
				username: business.username,
				userId: business._id,
				isAdmin: business.isAdmin,
			}),
		});
	} catch (error) {
		console.error(error);
		return res.status(500).send(RegisterError.Unknown);
	}
});

export enum LoginError {
	Unknown = "Unknown",
	InvalidInfo = "Invalid Info",
	InvalidUsernameOrPassword = "Invalid Credentials",
}

export const loginValidationScheme = z.object({
	username: z.string(),
	password: z.string(),
});

router.post("/login", async (req, res) => {
	let loginData = loginValidationScheme.safeParse(req.body);

	if (!loginData.success) {
		return res.status(400).send(LoginError.InvalidUsernameOrPassword);
	}

	const { username, password } = loginData.data;

	const user = await Business.findOne({ username, password });

	if (!user) {
		return res.status(422).send(LoginError.InvalidUsernameOrPassword);
	}

	if (!user.username)
		return res
			.status(500)
			.send("Unexpected error: no username saved on user account");

	res.send({
		token: generateJWTToken({
			username: user.username,
			userId: user._id,
			isAdmin: user.isAdmin,
		}),
	});
});

export default router;

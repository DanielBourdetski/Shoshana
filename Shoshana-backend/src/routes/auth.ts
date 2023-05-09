import { Router } from "express";
import { generateJWTToken } from "../jwt";
import { JWTToken, UserType } from "../types";
import { none } from "topkek-utils";
import {
	createBusiness,
	createImage,
	deleteImage,
	deleteUser,
	getBussinessByOwnerId,
	getUserByUsername,
	registerUser,
} from "../database";
import { z } from "zod";

const router = Router();

export enum RegisterError {
	Unknown = "Unknown",
	InvalidBodyInfo = "MissingBodyInfo",
	UsernameTaken = "UsernameTaken",
}

export const registerValidationScheme = z.object({
	username: z.string().min(3).max(50),

	password: z.string().min(8).max(50),
	email: z.string(),
	fullName: z.string(),
	businessName: z.string(),
	address: z.string(),
	phoneNumbers: z.object({ private: z.string(), public: z.string() }),
	// logo: z.instanceof(Uint8Array),
	logo: z.string(),
});

router.post("/register", async (req, res) => {
	//validating query
	let parsedValue = registerValidationScheme.safeParse(req.body);

	if (!parsedValue.success) {
		res.send(none(RegisterError.InvalidBodyInfo));
		return;
	}

	// try registering
	let user = await registerUser(
		parsedValue.data.username,
		parsedValue.data.password,
		UserType.Business
	);

	if (!user.ok) {
		res.send(none(RegisterError.UsernameTaken));
		return;
	}

	// saving logo of the business
	// let image = await createImage(parsedValue.data.logo);

	// if (!image.ok) {
	// 	deleteUser(user.res);
	// 	res.send(none(RegisterError.Unknown));
	// 	return;
	// }

	// saving business data
	let newBusiness = {
		address: parsedValue.data.address,
		appointments: [],
		businessName: parsedValue.data.businessName,
		ownerId: user.res,
		phoneNumber: parsedValue.data.phoneNumbers,
		logo: parsedValue.data.logo,
	};

	let business = await createBusiness(newBusiness);

	if (!business.ok) {
		deleteUser(user.res);
		// deleteImage(image.res);
		res.send(none(RegisterError.Unknown));
		return;
	}

	//sending jwt token
	res.send({
		token: generateJWTToken<JWTToken>({
			userType: UserType.Business,
			userId: user.res.toString(),
			businessId: business.res.toString(),
		}),

		business: newBusiness,
	});
});

export enum LoginError {
	Unknown = "Unknown",
	InvalidBodyInfo = "MissingBodyInfo",
	InvalidUsernameOrPassword = "InvalidUsernameOrPassword",
}

export const loginValidationScheme = z.object({
	username: z.string(),
	password: z.string(),
});

router.post("/login", async (req, res) => {
	let loginData = loginValidationScheme.safeParse(req.body);

	//validating query
	if (!loginData.success) {
		res.send(none(LoginError.InvalidBodyInfo));
		return;
	}

	let user = await getUserByUsername(loginData.data.username);

	//user exists
	if (!user.ok) {
		res.send(none(LoginError.InvalidUsernameOrPassword));
		return;
	}

	//valid credentials
	if (user.res.password !== loginData.data.password) {
		res.send(none(LoginError.InvalidUsernameOrPassword));
		return;
	}

	let business = await getBussinessByOwnerId(user.res._id);

	if (!business.ok) {
		res.send(none(LoginError.Unknown));
		return;
	}

	//sending jwt token
	res.send({
		token: generateJWTToken<JWTToken>({
			userType: user.res.userType,
			userId: user.res._id.toString(),
			businessId: business.res._id.toString(),
		}),
	});
});

export default router;

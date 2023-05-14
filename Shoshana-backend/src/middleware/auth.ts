import { ObjectId } from "mongoose";
import type { Request, Response, NextFunction, RequestHandler } from "express";
import { verifyJWTToken } from "../jwt";
import Business, { IBusiness } from "../models/business";

interface AuthRequest extends Request {
	user?: IBusiness;
}

export const auth = async (
	req: AuthRequest,
	res: Response,
	next: NextFunction
) => {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		return res.status(401).send("Unauthorized");
	}

	// Split the header value into an array to get the token
	const [authType, token] = authHeader.split(" ");

	// Check if the authorization type is not Bearer
	if (authType !== "Bearer") {
		return res.status(401).send("Unauthorized");
	}

	const tokenData = verifyJWTToken(token);
	const user = await Business.findById(tokenData.userId);

	if (!user) return res.status(400).send("Invalid User Id");

	req.user = user;
	next();
};

export const adminAuth = async (
	req: AuthRequest,
	res: Response,
	next: NextFunction
) => {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		return res.status(401).send("Unauthorized");
	}

	const [authType, token] = authHeader.split(" ");

	if (authType !== "Bearer") {
		return res.status(401).send("Unauthorized");
	}

	const tokenData = verifyJWTToken(token);
	const user = await Business.findById(tokenData.userId);

	if (!user) return res.status(400).send("Invalid User Id");

	if (!user.isAdmin) return res.status(401).send("Unauthorized");

	req.user = user;
	next();
};

import { Router } from "express";
import { generateJWTToken, verifyJWTToken } from "../jwt";

const router = Router();

router.get("/jwt", (req, res) => {
	const token = generateJWTToken({ username: "Danila", isAdmin: false });
	verifyJWTToken(token);

	res.send(token);
});

export default router;

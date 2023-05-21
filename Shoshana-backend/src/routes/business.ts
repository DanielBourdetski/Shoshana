import { Router } from "express";
// import { createAuthMiddleware } from "../middleware/auth";
import { UserType } from "../types";
import { ExtendedRequest, auth } from "../middleware/auth";

let router = Router();

// const authBusiness = createAuthMiddleware([UserType.Business, UserType.Admin]);

// read
router.get("/:id", (req, res) => {});

router.get("", auth, (req: ExtendedRequest, res) => {
	console.log(req.business);
	res.json(req.business);
});

router.post("", (req, res) => {});

// write
router.post("/:id", (req, res) => {});

// read business icon
router.get("/icon/:id", (req, res) => {});

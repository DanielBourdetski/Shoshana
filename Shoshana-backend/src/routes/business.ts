import { Router } from "express";
import { createAuthMiddleware } from "../middleware/auth";
import { UserType } from "../types";

let router = Router();

const authBusiness = createAuthMiddleware([UserType.Business, UserType.Admin]);

// read
router.get("/business/[id]", (req, res) => {

});

router.get("/business", (req, res) => {

})

router.post("/businesss", (req, res) => {});

// write
router.post("/business/[id]", (req, res) => {});

// read business icon
router.get("/business/icon/[id]", (req, res) => {});

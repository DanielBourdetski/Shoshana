import { Router } from "express";
const router = Router();

// ? get all appointments of logged business /
router.get("/", (req, res) => {});

// ? get certain appointment
router.get("/:id", (req, res) => {});

// ? set new appointment
router.post("/", (req, res) => {});

// ? update appointment
router.put("/:id", (req, res) => {});

// ? cancel an appointment, will leave it in the database
router.delete("/:id", (req, res) => {});

// ? delete an appointment completely
router.delete("/perma/:id", (req, res) => {});

export default router;

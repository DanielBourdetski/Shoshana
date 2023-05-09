import Express from "express";
import mongoose from "mongoose";
import { registerUser } from "./database";
import cors from "cors";
import bodyParser from "body-parser";
import { UserType } from "./types";
import authRouter from "./routes/auth";

const app = Express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use("/auth", authRouter);

app.get("/business/:id", (req, res) => {
	res.sendStatus(200);
});

app.post("/business/create", (req, res) => {});

mongoose
	.connect("mongodb://localhost:27017/shoshana")
	.then(() => console.log("Connected to MognoDB"))
	.catch(() => console.error("MongoDB connection error"));

app.listen(port, () => {
	console.log(`Successfuly connected to http://localhost:${port}`);
});

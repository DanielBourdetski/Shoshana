import Express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import authRouter from "./routes/auth";
import TESTRouter from "./routes/TEST";
import Business from "./models/business";

const app = Express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use("/auth", authRouter);
app.use("/test", TESTRouter);

mongoose
	.connect("mongodb://localhost:27017/shoshana")
	.then(() => console.log("Connected to MognoDB"))
	.catch(() => console.error("MongoDB connection error"));

app.listen(port, () => {
	console.log(`Successfuly connected to http://localhost:${port}`);
});

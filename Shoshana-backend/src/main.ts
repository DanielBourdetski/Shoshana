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
	.then(() => console.log("mongo: Connected to MognoDB"))
	.catch(() => console.error("MongoDB connection error"));

app.listen(port, async () => {
	console.log(`Successfuly connected to http://localhost:${port}`);
	console.log("server: Admin user check");

	let user = (await Business.exists({ username: "admin" })) as any;

	if (!user) {
		user = new Business({
			username: "admin",

			password: "admin",
			email: "admin@shoshana.com",
			name: {
				first: "admin",
				last: "admin",
			},
			businessName: "Shoshana LLC",
			address: "some magical address",
			phoneNumbers: { public: "0545454545", private: "0545454545" },
			logo: "SHOSHANA LOGO",
		});

		await user.save();

		return console.log("server: Admin created!");
	}

	console.log("server: Admin exists");
});

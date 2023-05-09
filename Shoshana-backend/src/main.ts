import Express from "express";
import { loadDB, registerUser } from "./database";
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

app.listen(port, () => {
	loadDB("mongodb://127.0.0.1:27017")
		.catch(console.dir)
		.then(() => {
			registerUser("admin", "admin", UserType.Admin);
		});

	console.log(`App listening on http://localhost:${port}`);
});

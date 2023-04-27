import Express from "express";
import { ObjectId } from "mongodb";
import { createAuthMiddleware } from "./authMiddleware";
import { getAdminByUsername, loadDB, registerAdmin } from "./database";
import { generateJWTToken, verifyJWTToken } from "./jwt";
import { JWTToken, UserType } from "./types";
import cors from "cors";
import bodyParser from "body-parser";

const app = Express();
const port = 3000;

loadDB("mongodb://127.0.0.1:27017").catch(console.dir);

app.use(cors());
app.use(bodyParser.json());

app.post("/admin/register", async (req, res) => {
  let body = req.body as { username?: string; password?: string };
  console.log(body);

  //validating query
  if (!body.username || !body.password) {
    res.status(400).send("No valid info");
    return;
  }

  let user = await registerAdmin(body.username, body.password);
  console.log(user);

  if (!user.ok) {
    res.status(400).send("Problem with the user");
    return;
  }

  //sending jwt token
  res.send({
    token: generateJWTToken<JWTToken>({
      userType: UserType.Admin,
      userId: user.res.toString(),
    }),
  });
});

app.get("/admin/login", async (req, res) => {
  let query = req.query as { username?: string; password?: string };

  //validating query
  if (!query.username || !query.password) {
    res.sendStatus(400);

    return;
  }

  let user = await getAdminByUsername(query.username);

  //user exists
  if (!user.ok) {
    res.status(404).send("Invalid credentials");
    return;
  }

  //valid credentials
  if (
    user.res.username !== query.username ||
    user.res.password !== query.password
  ) {
    res.sendStatus(400);
    return;
  }

  //sending jwt token
  res.send({
    token: generateJWTToken<JWTToken>({
      userType: UserType.Admin,
      userId: user.res._id.toString(),
    }),
  });
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});

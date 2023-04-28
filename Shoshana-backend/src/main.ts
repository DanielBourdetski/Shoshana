import Express from "express";
import { getUserByUsername, loadDB, registerUser } from "./database";
import { generateJWTToken, verifyJWTToken } from "./jwt";
import { JWTToken, UserType } from "./types";
import cors from "cors";
import bodyParser from "body-parser";

const app = Express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post("/register", async (req, res) => {
  let body = req.body as { username?: string; password?: string };

  //validating query
  if (!body.username || !body.password) {
    res.status(400).send("No valid info");
    return;
  }

  let user = await registerUser(body.username, body.password, UserType.Business);
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

app.post("/login", async (req, res) => {
let body = req.body as { username?: string; password?: string };

  //validating query
  if (!body.username || !body.password) {
    res.sendStatus(400);

    return;
  }

  let user = await getUserByUsername(body.username);

  //user exists
  if (!user.ok) {
    res.sendStatus(400);
    return;
  }

  //valid credentials
  if (
    user.res.username !== body.username ||
    user.res.password !== body.password
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
    
    loadDB("mongodb://127.0.0.1:27017").catch(console.dir)
    .then(()=> {
        registerUser("admin", "admin", UserType.Admin);
    });

    console.log(`Example app listening on http://localhost:${port}`);
});

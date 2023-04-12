import Express from "express";
import { createAuthMiddleware } from "./authMiddleware";
import { loadDB } from "./database";
import { generateJWTToken, varifyJWTToken } from "./jwt";
import { JWTToken, UserType } from "./types";

const app = Express();
const port = 3000

loadDB("mongodb://localhost:27017").catch(console.dir);

app.get('/login', (req, res) => {
    res.send({
        token: generateJWTToken<JWTToken>({userType: UserType.Business})
    });
})

app.get('/', createAuthMiddleware([UserType.Admin]) ,(req, res) => {
    res.send('Hello World!')
})

app.get('/Business', createAuthMiddleware([UserType.Business, UserType.Admin]) ,(req, res) => {
    res.send('Hello Businesses!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})



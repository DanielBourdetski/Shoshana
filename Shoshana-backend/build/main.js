"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./database");
const jwt_1 = require("./jwt");
const types_1 = require("./types");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.post("/register", async (req, res) => {
    let body = req.body;
    //validating query
    if (!body.username || !body.password) {
        res.status(400).send("Missing Info");
        return;
    }
    let user = await (0, database_1.registerUser)(body.username, body.password, types_1.UserType.Business);
    if (!user.ok) {
        res.status(400).send("Problem with the user");
        return;
    }
    //sending jwt token
    res.send({
        token: (0, jwt_1.generateJWTToken)({
            userType: types_1.UserType.Admin,
            userId: user.res.toString(),
        }),
    });
});
app.post("/login", async (req, res) => {
    let body = req.body;
    console.log(body);
    //validating query
    if (!body.username || !body.password) {
        res.status(400).send("Missing Info");
        return;
    }
    let user = await (0, database_1.getUserByUsername)(body.username);
    //user exists
    if (!user.ok) {
        res.status(400).send("Invalid Credentials");
        return;
    }
    //valid credentials
    if (user.res.username !== body.username ||
        user.res.password !== body.password) {
        res.status(400).send("Invalid Credentials");
        return;
    }
    //sending jwt token
    res.send({
        token: (0, jwt_1.generateJWTToken)({
            userType: types_1.UserType.Admin,
            userId: user.res._id.toString(),
        }),
    });
});
app.listen(port, () => {
    (0, database_1.loadDB)("mongodb://127.0.0.1:27017")
        .catch(console.dir)
        .then(() => {
        (0, database_1.registerUser)("admin", "admin", types_1.UserType.Admin);
    });
    console.log(`Example app listening on http://localhost:${port}`);
});

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
(0, database_1.loadDB)("mongodb://127.0.0.1:27017").catch(console.dir);
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.post("/admin/register", async (req, res) => {
    let body = req.body;
    console.log(body);
    //validating query
    if (!body.username || !body.password) {
        res.status(400).send("No valid info");
        return;
    }
    let user = await (0, database_1.registerAdmin)(body.username, body.password);
    console.log(user);
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
app.get("/admin/login", async (req, res) => {
    let query = req.query;
    //validating query
    if (!query.username || !query.password) {
        res.sendStatus(400);
        return;
    }
    let user = await (0, database_1.getAdminByUsername)(query.username);
    //user exists
    if (!user.ok) {
        res.status(404).send("Invalid credentials");
        return;
    }
    //valid credentials
    if (user.res.username !== query.username ||
        user.res.password !== query.password) {
        res.sendStatus(400);
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
    console.log(`Example app listening on http://localhost:${port}`);
});

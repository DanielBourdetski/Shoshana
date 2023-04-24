"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./database");
const jwt_1 = require("./jwt");
const types_1 = require("./types");
const app = (0, express_1.default)();
const port = 3000;
(0, database_1.loadDB)("mongodb://127.0.0.1:27017").catch(console.dir);
app.get('/admin/register', async (req, res) => {
    let query = req.query;
    //validating query
    if (!query.username || !query.password) {
        res.sendStatus(400);
        return;
    }
    let user = await (0, database_1.registerAdmin)(query.username, query.password);
    console.log(user);
    if (!user.ok) {
        res.sendStatus(400);
        return;
    }
    //sending jwt token
    res.send({
        token: (0, jwt_1.generateJWTToken)({ userType: types_1.UserType.Admin, userId: user.res.toString() })
    });
});
app.get('/admin/login', async (req, res) => {
    let query = req.query;
    //validating query
    if (!query.username || !query.password) {
        res.sendStatus(400);
        return;
    }
    let user = await (0, database_1.getAdminByUsername)(query.username);
    //user exists
    if (!user.ok) {
        res.sendStatus(400);
        return;
    }
    //valid credentials
    if (user.res.username !== query.username || user.res.password !== query.password) {
        res.sendStatus(400);
        return;
    }
    //sending jwt token
    res.send({
        token: (0, jwt_1.generateJWTToken)({ userType: types_1.UserType.Admin, userId: user.res._id.toString() })
    });
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

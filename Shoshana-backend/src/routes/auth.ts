import { Router } from "express";
import { generateJWTToken } from "../jwt";
import { JWTToken, UserType } from "../types";
import { none } from "topkek-utils";
import { getUserByUsername, registerUser } from "../database";

const router = Router();

enum RegisterError {
    MissingBodyInfo = "MissingBodyInfo",
    UsernameTaken = "UsernameTaken",
}

router.post("/register", async (req, res) => {
    let body = req.body as { username?: string; password?: string };

    //validating query
    if (!body.username || !body.password) {
        res.send(none(RegisterError.MissingBodyInfo));
        return;
    }

    let user = await registerUser(
        body.username,
        body.password,
        UserType.Business
    );

    if (!user.ok) {
        res.send(none(RegisterError.UsernameTaken));
        return;
    }

    //sending jwt token
    res.send({
        token: generateJWTToken<JWTToken>({
            userType: UserType.Business,
            userId: user.res.toString(),
        }),
    });

});

enum LoginError {
    MissingBodyInfo = "MissingBodyInfo",
    InvalidUsernameOrPassword = "InvalidUsernameOrPassword"
}

router.post("/login", async (req, res) => {
    let body = req.body as { username?: string; password?: string };
    console.log(body);

    //validating query
    if (!body.username || !body.password) {
        res.send(none(LoginError.MissingBodyInfo));
        return;
    }

    let user = await getUserByUsername(body.username);

    //user exists
    if (!user.ok) {
        res.send(none(LoginError.InvalidUsernameOrPassword));
        return;
    }

    //valid credentials
    if (user.res.password !== body.password) {
        res.send(none(LoginError.InvalidUsernameOrPassword));
        return;
    }

    //sending jwt token
    res.send({
        token: generateJWTToken<JWTToken>({
            userType: user.res.userType,
            userId: user.res._id.toString(),
        }),
    });
});

export default router;
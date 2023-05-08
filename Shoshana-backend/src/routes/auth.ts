import { Router } from "express";
import { generateJWTToken } from "../jwt";
import { JWTToken, UserType } from "../types";
import { none } from "topkek-utils";
import { getUserByUsername, registerUser } from "../database";
import { z } from "zod";

const router = Router();

enum RegisterError {
    InvalidBodyInfo = "MissingBodyInfo",
    UsernameTaken = "UsernameTaken",
}

let registerScheme = z.object({
    username : z.string(),
    password: z.string()
});

router.post("/register", async (req, res) => {

    //validating query
    let parsedValue = registerScheme.safeParse(req.body);

    if (!parsedValue.success) {
        res.send(none(RegisterError.InvalidBodyInfo));
        return;
    }

    let user = await registerUser(
        parsedValue.data.username,
        parsedValue.data.password,
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
    InvalidBodyInfo = "MissingBodyInfo",
    InvalidUsernameOrPassword = "InvalidUsernameOrPassword"
}

let loginScheme = z.object({
    username : z.string(),
    password: z.string()
});

router.post("/login", async (req, res) => {
    let loginData = loginScheme.safeParse(req.body);

    //validating query
    if (!loginData.success) {
        res.send(none(LoginError.InvalidBodyInfo));
        return;
    }

    let user = await getUserByUsername(loginData.data.username);

    //user exists
    if (!user.ok) {
        res.send(none(LoginError.InvalidUsernameOrPassword));
        return;
    }

    //valid credentials
    if (user.res.password !== loginData.data.password) {
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
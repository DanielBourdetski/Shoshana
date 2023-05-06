import { JWTToken, UserType } from "../types";
import type { Request, Response, NextFunction } from "express";
import { verifyJWTToken } from "../jwt";

/**
 * creates middleware function for express.
 * @param userType array of user types that can access the the next middleware after this one.
 * @return auth middleware function for express.
 */
export function createAuthMiddleware(
  userTypes: UserType[]
): (
  req: Request,
  res: Response & { jwtToken: JWTToken },
  next: NextFunction
) => void {
  return (req, res, next) => {
    if (!req.headers.authorization) {
      // no token found
      res.sendStatus(401);
      return;
    }

    let [bearer, token] = req.headers.authorization.split(" ");

    if (bearer != "Bearer") {
      // not bearer token
      res.sendStatus(401);
      return;
    }

    let resJwt = verifyJWTToken<JWTToken>(token);

    if (!resJwt.ok) {
      // invalid token
      res.sendStatus(401);
      return;
    }

    let jwtToken: JWTToken = resJwt.res.data;

    let foundUserType: boolean = false;

    for (let i = 0; i < userTypes.length; i++) {
      if (userTypes[i] === jwtToken.userType) {
        foundUserType = true;
        break;
      }
    }

    if (!foundUserType) {
      // user auth incorrect
      res.sendStatus(401);
      return;
    }

    res.jwtToken = jwtToken;

    next();
  };
}

import { NextFunction, Request, RequestHandler, Response } from "express";
import { AuthenticatedRequest } from "../types/route";
import jwt, { JwtPayload } from "jsonwebtoken";
import { promisify } from "util";
import CustomError from "../services/CustomError";
import { User } from "../models/users";
import { NOMOREACCOUNT, NOAUTH, EMPTYBODY } from "../constants/errors";
import { BAD_REQUEST, UNAUTHORIZED } from "../constants/httpCodes";
import { catchAsync } from "../services/catchAsync";
import { config } from "../constants/config";

interface DecodedToken extends JwtPayload {
  id: string;
  iat: number;
}

export const protect: RequestHandler = catchAsync(
  async (req: Request, _: Response, next: NextFunction): Promise<void> => {
    let token: string | undefined;

    // 1. Getting token
    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.signedCookies.jwt) {
      token = req.signedCookies.jwt;
    }

    if (!token) {
      return next(new CustomError(NOAUTH, UNAUTHORIZED));
    }

    // 2. Token verification
    const decoded = (await promisify(jwt.verify as any)(
      token,
      config.JWT_SECRET
    )) as DecodedToken;

    // 3. Check if user still exitst
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new CustomError(NOMOREACCOUNT, UNAUTHORIZED));
    }

    // 4. Check if password was changed recently
    // @later

    // access to protected route
    (req as AuthenticatedRequest).user = user;
    next();
  }
);

export const bodyExitst = (req: Request, _: Response, next: NextFunction) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return next(new CustomError(EMPTYBODY, BAD_REQUEST));
  }
  next();
};

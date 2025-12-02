import { CookieOptions, NextFunction, Request, Response } from "express";
import { catchAsync } from "../services/catchAsync";
import { AuthenticatedRequest } from "../types/route";
import { NOCREDENTIALS, NODOCUMENTFOUND, NOPERMISSION, SUCCESS, WRONGCREDENTIALS } from "../constants/errors";
import { BAD_REQUEST, FORBIDDEN, NOT_FOUND, OK } from "../constants/httpCodes";
import { User } from "../models/users";
import { IUser } from "../types/schemas";
import { config } from "../constants/config";
import { Record } from "../models/records";
import jwt from "jsonwebtoken";
import CustomError from "../services/CustomError";

export const authenticated = catchAsync(async (req: AuthenticatedRequest, res: Response, _: NextFunction) => {
  res.status(OK).json({ status: SUCCESS, data: req.user });
});

export const logout = catchAsync(async (req: AuthenticatedRequest, res: Response, __: NextFunction) => {
  res.cookie("jwt", ".", { httpOnly: true, maxAge: 0 });
  res.status(OK).json({ status: SUCCESS });

  //take a record
  await Record.create({
    user: req.user._id,
    actionType: "LOGOUT",
    entityType: "User",
    entityId: req.user._id,
    description: `User ${req.user.name} logged out of the system.`,
    metadata: {},
  });
});

export const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // Getting email and password
  const { email, password } = req.body as {
    email?: string;
    password?: string;
  };
  // Check for input
  if (!email || !password) return next(new CustomError(NOCREDENTIALS, BAD_REQUEST));
  // Finding user by email
  const user: IUser | null = await User.findOne({ email: email }).select("+password");
  // Checking if the password is right or user exists
  if (!user) {
    return next(new CustomError(NODOCUMENTFOUND("user"), NOT_FOUND));
  }
  console.log(user.password);
  if (!(await user.confirmPassword(password, user.password))) {
    return next(new CustomError(WRONGCREDENTIALS, BAD_REQUEST));
  }

  // take a record
  await Record.create({
    user: user._id,
    actionType: "LOGIN",
    entityType: "User",
    entityId: user._id,
    description: `User ${user.name} logged into the system.`,
    metadata: {},
  });

  // Send the response
  createAndSendToken(user, res, OK);
});

// Token create and send
function createAndSendToken(user: IUser, res: Response, code: number) {
  // creating jwt token
  const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRES_IN,
  });

  const cookieOptions: CookieOptions = {
    expires: new Date(Date.now() + config.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    secure: true,
    httpOnly: true,
    sameSite: "none",
  };

  user.password = "";

  // sending cookies
  res.cookie("jwt", token, cookieOptions);
  res.status(code).json({ status: SUCCESS, token, data: user });
}

export const acessTo =
  (...roles: string[]) =>
  (req: Request, _: Response, next: NextFunction) => {
    // check for the roles permission
    const { user } = req as AuthenticatedRequest; // THIS IS PAIN. NOTE!!! TSSSSSS!
    const permission = roles.includes(user.role);
    if (!permission) {
      return next(new CustomError(NOPERMISSION, FORBIDDEN));
    }
    next();
  };

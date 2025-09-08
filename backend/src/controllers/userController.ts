import { NextFunction, Response } from "express";
import { catchAsync } from "../services/catchAsync";
import { AuthenticatedRequest } from "../types/route";
import { User } from "../models/users";
import { IUser } from "../types/schemas";
import { BAD_REQUEST, CREATED, NO_CONTENT, OK } from "../constants/httpCodes";
import {
  INVALIDID,
  NOIDPROVIDED,
  NOUSERFOUND,
  SUCCESS,
} from "../constants/errors";
import CustomError from "../services/CustomError";
import mongoose from "mongoose";
import { apiFeatures } from "../services/apiFeatures";

export const getUsers = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    // filter out "owner"
    const query = User.find({ role: "manager" });

    const features = new apiFeatures(query, req.query)
      .filter()
      .sort()
      .limitFields()
      .pagination();

    const users: IUser[] = await features.getQuery();

    res
      .status(OK)
      .json({ status: SUCCESS, data: users, results: users.length });
  }
);

export const getUser = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    // getting specific user by id (personal page)
    const { id } = req.params;

    if (!id) {
      return next(new CustomError(NOIDPROVIDED, BAD_REQUEST));
    }

    if (!mongoose.isValidObjectId(id)) {
      return next(new CustomError(INVALIDID, BAD_REQUEST));
    }

    const user: IUser | null = await User.findById(id);

    if (user == null) {
      return next(new CustomError(NOUSERFOUND("user"), BAD_REQUEST));
    }

    res.status(OK).json({ status: SUCCESS, data: user });
  }
);

export const createUser = catchAsync(
  async (req: AuthenticatedRequest, res: Response, _: NextFunction) => {
    // Create user
    const user: IUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    });

    res.status(CREATED).json({ status: SUCCESS, data: user });
  }
);

export const updateMe = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    // updating yourself
    const updateUser: Partial<IUser> = req.body;
    const updatedUser = await User.findOneAndUpdate(
      { email: req.user.email },
      updateUser,
      { new: true, runValidators: false }
    );

    res.status(OK).json({ status: SUCCESS, data: updatedUser });
  }
);

export const updateUser = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    // updating user (only owner)
    const updateUser: Partial<IUser> = req.body;
    const updatedUser: IUser | null = await User.findByIdAndUpdate(
      updateUser._id,
      updateUser,
      { new: true, runValidators: false }
    );

    if (updatedUser == null) {
      return next(new CustomError(NOUSERFOUND("user"), BAD_REQUEST));
    }

    res.status(OK).json({ status: SUCCESS, data: updatedUser });
  }
);

export const deleteUser = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    // deleting many users (only owner)
    const id: string[] | undefined = req.body.id;

    if (!id) {
      return next(new CustomError(NOIDPROVIDED, BAD_REQUEST));
    }

    await User.deleteMany({ _id: { $in: id } });

    res.status(NO_CONTENT).json({ status: SUCCESS });
  }
);

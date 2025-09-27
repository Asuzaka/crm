import bcrypt from "bcrypt";
import { NextFunction, Response } from "express";
import { catchAsync } from "../services/catchAsync";
import { AuthenticatedRequest } from "../types/route";
import { User } from "../models/users";
import { IUser } from "../types/schemas";
import {
  BAD_REQUEST,
  CREATED,
  NO_CONTENT,
  NOT_FOUND,
  OK,
} from "../constants/httpCodes";
import {
  INVALIDID,
  INVALIDQUERORNOQUERY,
  NODOCUMENTFOUND,
  NOIDPROVIDED,
  SUCCESS,
} from "../constants/errors";
import CustomError from "../services/CustomError";
import mongoose from "mongoose";
import { apiFeatures } from "../services/apiFeatures";
import { Record } from "../models/records";

export const getUsers = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    // filter out "owner"
    const query = User.find({ role: "manager" })
      .populate("activity")
      .populate("responsible", "_id name");

    const featuresForCount = new apiFeatures(query, req.query)
      .filter()
      .search(["name", "email"]);

    // Count total before pagination
    const totalResults = await featuresForCount
      .getQuery()
      .clone()
      .countDocuments();

    const featuresForQuery = featuresForCount.sort().limitFields().pagination();

    const users: IUser[] = await featuresForQuery.getQuery();

    const limit = Number(req.query.limit) || 10;
    const totalPages = Math.ceil(totalResults / limit);

    res.status(OK).json({
      status: SUCCESS,
      data: users,
      results: users.length,
      documents: totalResults,
      pages: totalPages,
    });
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

    const user: IUser | null = await User.findById(id).populate(
      "responsible activity"
    );

    if (user == null) {
      return next(new CustomError(NODOCUMENTFOUND("user"), NOT_FOUND));
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
    // take a record
    await Record.create({
      user: req.user._id,
      actionType: "CREATE",
      entityType: "User",
      entityId: user._id,
      description: `Created "${user.email}" manager.`,
      metadata: {
        email: user.email,
        responsible: user.responsible,
        permissions: user.permissions,
      },
    });
  }
);

export const updateMe = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    // updating yourself
    const updateUser: Partial<IUser> = req.body;

    if (updateUser.password) {
      updateUser.password = await bcrypt.hash(updateUser.password, 12);
    }

    const updatedUser: IUser | null = await User.findOneAndUpdate(
      { email: req.user.email },
      updateUser,
      { new: true }
    );

    if (updatedUser === null) {
      return next(new CustomError(NODOCUMENTFOUND("user"), NOT_FOUND));
    }

    res.status(OK).json({ status: SUCCESS, data: updatedUser });

    // take a record
    await Record.create({
      user: req.user._id,
      actionType: "UPDATE",
      entityType: "User",
      entityId: updatedUser._id,
      description: `Updated "${updatedUser.email}" manager.`,
      metadata: {
        email: updatedUser.email,
        responsible: updatedUser.responsible,
        permissions: updatedUser.permissions,
      },
    });
  }
);

export const updateUser = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    // updating user (only owner)
    const updateUser: Partial<IUser> = req.body;
    const { id } = req.params;

    if (!id) {
      return next(new CustomError(NOIDPROVIDED, BAD_REQUEST));
    }

    if (!mongoose.isValidObjectId(id)) {
      return next(new CustomError(INVALIDID, BAD_REQUEST));
    }

    if (updateUser.password) {
      updateUser.password = await bcrypt.hash(updateUser.password, 12);
    }

    const updatedUser: IUser | null = await User.findByIdAndUpdate(
      id,
      updateUser,
      { new: true, runValidators: false }
    );

    if (updatedUser == null) {
      return next(new CustomError(NODOCUMENTFOUND("user"), NOT_FOUND));
    }

    res.status(OK).json({ status: SUCCESS, data: updatedUser });

    // take a record
    await Record.create({
      user: req.user._id,
      actionType: "UPDATE",
      entityType: "User",
      entityId: updatedUser._id,
      description: `Updated "${updatedUser.email}" manager.`,
      metadata: {
        email: updatedUser.email,
        responsible: updatedUser.responsible,
        permissions: updatedUser.permissions,
      },
    });
  }
);

export const deleteUser = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    // deleting many users (only owner)
    const id: string[] | undefined = req.body.id;

    if (!id || id.length === 0) {
      return next(new CustomError(NOIDPROVIDED, BAD_REQUEST));
    }

    const users = await User.find({ _id: { $in: id } });

    if (users.length === 0) {
      return next(new CustomError(NODOCUMENTFOUND("user"), NOT_FOUND));
    }

    // delete them
    await User.deleteMany({ _id: { $in: id } });

    // log each deletion
    const records = users.map((u) => ({
      user: req.user._id,
      actionType: "DELETE",
      entityType: "User",
      entityId: u._id,
      description: `Deleted user "${u.name}" (${u.email}).`,
      metadata: {
        permissions: u.permissions,
        lastLogin: u.lastLogin,
        responsible: u.responsible,
      },
    }));

    await Record.insertMany(records);

    res.status(NO_CONTENT).json({ status: SUCCESS });
  }
);

export const searchUsers = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    // search for groups
    const { query } = req.query;
    if (!query) {
      return next(new CustomError(INVALIDQUERORNOQUERY, BAD_REQUEST));
    }

    const groups = await User.find({
      name: { $regex: query, $options: "i" },
    })
      .limit(10)
      .select("_id name");

    res.json({ status: SUCCESS, data: groups });
  }
);

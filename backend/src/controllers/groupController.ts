import { NextFunction, Response } from "express";
import { catchAsync } from "../services/catchAsync";
import { AuthenticatedRequest } from "../types/route";
import { IGroup } from "../types/schemas";
import { Group } from "../models/groups";
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
import { filterout } from "../services/helpers";

export const createGroup = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    // create group
    const group: IGroup = await Group.create({
      name: req.body.name,
      teacher: req.body.teacher,
      students: req.body.students,
      schedule: req.body.schedule,
      start: req.body.start,
      room: req.body.start,
      price: req.body.price,
    });

    res.status(CREATED).json({ status: SUCCESS, data: group });
  }
);

export const getGroup = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    // get group by id
    const { id } = req.params;

    if (!id) {
      return next(new CustomError(NOIDPROVIDED, BAD_REQUEST));
    }

    if (!mongoose.isValidObjectId(id)) {
      return next(new CustomError(INVALIDID, BAD_REQUEST));
    }

    const group: IGroup | null = await Group.findById(id);

    if (group === null) {
      return next(new CustomError(NOUSERFOUND("group"), BAD_REQUEST));
    }

    res.status(OK).json({ status: SUCCESS, data: group });
  }
);

export const getGroups = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    // get a list of groups
    const query = Group.find();
    const features = new apiFeatures(query, req.query)
      .filter()
      .sort()
      .limitFields()
      .pagination();

    const groups: IGroup[] = await features.getQuery();

    res
      .status(OK)
      .json({ status: SUCCESS, data: groups, results: groups.length });
  }
);

export const updateGroup = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    // updata a group by id
    const { id } = req.params || req.body;

    const filteredBody: Partial<IGroup> = filterout(
      req.body,
      "teacher",
      "history"
    );

    if (!id) {
      return next(new CustomError(NOIDPROVIDED, BAD_REQUEST));
    }

    if (!mongoose.isValidObjectId(id)) {
      return next(new CustomError(INVALIDID, BAD_REQUEST));
    }

    const updatedGroup = await Group.findByIdAndUpdate(id, filteredBody, {
      new: true,
      runValidators: false,
    });

    res.status(OK).json({ status: SUCCESS, data: updatedGroup });
  }
);

export const deleteGroup = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    // delete group/groups by array of id
    const id: string[] | undefined = req.body.id;

    if (!id) {
      return next(new CustomError(NOIDPROVIDED, BAD_REQUEST));
    }

    await Group.deleteMany({ _id: { $in: id } });

    res.status(NO_CONTENT).json({ status: SUCCESS });
  }
);

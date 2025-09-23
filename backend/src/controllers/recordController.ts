import { NextFunction, Response } from "express";
import { catchAsync } from "../services/catchAsync";
import { AuthenticatedRequest } from "../types/route";
import CustomError from "../services/CustomError";
import {
  INVALIDID,
  NODOCUMENTFOUND,
  NOIDPROVIDED,
  SUCCESS,
} from "../constants/errors";
import { BAD_REQUEST, NOT_FOUND, OK } from "../constants/httpCodes";
import mongoose from "mongoose";
import { Record } from "../models/records";
import { apiFeatures } from "../services/apiFeatures";
import { IRecord } from "../types/schemas";

// get Records
export const getRecords = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    // case 1 : general with query
    // case 2 : for specific user with id
    const { id } = req.params;

    if (!id && req.user.role !== "owner") {
      return next(new CustomError(NOIDPROVIDED, BAD_REQUEST));
    }

    if (!mongoose.isValidObjectId(id) && req.user.role !== "owner") {
      return next(new CustomError(INVALIDID, BAD_REQUEST));
    }

    let query;

    if (id) {
      query = Record.find({ user: id }).populate("user", "name email");
    } else {
      query = Record.find().populate("user", "name email");
    }

    const featuresForCount = new apiFeatures(query, req.query)
      .filter()
      .search(["description"]);

    // Count total before pagination
    const totalResults = await featuresForCount
      .getQuery()
      .clone()
      .countDocuments();

    const featuresForQuery = featuresForCount.sort().limitFields().pagination();

    const records: IRecord[] = await featuresForQuery.getQuery();

    const limit = Number(req.query.limit) || 10;
    const totalPages = Math.ceil(totalResults / limit);

    res.status(OK).json({
      status: SUCCESS,
      data: records,
      result: records.length,
      documents: totalResults,
      pages: totalPages,
    });
  }
);

// get Record // id
export const getRecord = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!id) {
      return next(new CustomError(NOIDPROVIDED, BAD_REQUEST));
    }

    if (!mongoose.isValidObjectId(id)) {
      return next(new CustomError(INVALIDID, BAD_REQUEST));
    }

    const record: IRecord | null = await Record.findById(id).populate(
      "user",
      "_id name"
    );

    if (record === null) {
      return next(new CustomError(NODOCUMENTFOUND("record"), NOT_FOUND));
    }

    res.status(OK).json({ status: SUCCESS, data: record });
  }
);
// A NEED?
// post Record craete //id
export const createRecords = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {}
);
// patch Record update //id
export const updateRecords = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {}
);
// delete Record delete
export const deleteRecords = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {}
);

import { NextFunction, Response } from "express";
import { catchAsync } from "../services/catchAsync";
import { AuthenticatedRequest } from "../types/route";
import { Lesson } from "../models/lessons";
import CustomError from "../services/CustomError";
import {
  INVALIDID,
  NODATEPROVIDED,
  NODOCUMENTFOUND,
  NOIDPROVIDED,
  SUCCESS,
} from "../constants/errors";
import {
  BAD_REQUEST,
  CREATED,
  NO_CONTENT,
  NOT_FOUND,
  OK,
} from "../constants/httpCodes";
import mongoose from "mongoose";
import { ILesson } from "../types/schemas";
import { filterout, getDateRange } from "../services/helpers";
import { Record } from "../models/records";

// get "A" groups "A-week?\A-month?"
export const getLessons = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    // id of GROUP
    const { id } = req.params;
    const { date, period } = req.query;
    // period can be "day" | "week" | "month"

    if (!id) {
      return next(new CustomError(NOIDPROVIDED, BAD_REQUEST));
    }

    if (!mongoose.isValidObjectId(id)) {
      return next(new CustomError(INVALIDID, BAD_REQUEST));
    }

    if (!date) {
      return next(new CustomError(NODATEPROVIDED, BAD_REQUEST));
    }

    const { start, end } = getDateRange(
      new Date(date as string),
      period as string
    );

    const lessons: ILesson[] = await Lesson.find({
      group: id,
      date: { $gte: start, $lte: end },
    }).sort({ date: 1 });

    res
      .status(OK)
      .json({ status: SUCCESS, data: lessons, results: lessons.length });
  }
);

// get "A" groups "A-day"
export const getLesson = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    // id of LESSON
    const { id } = req.params;

    if (!id) {
      return next(new CustomError(NOIDPROVIDED, BAD_REQUEST));
    }

    if (!mongoose.isValidObjectId(id)) {
      return next(new CustomError(INVALIDID, BAD_REQUEST));
    }

    const lesson: ILesson | null = await Lesson.findById(id);

    if (lesson === null) {
      return next(new CustomError(NODOCUMENTFOUND("lesson"), NOT_FOUND));
    }

    res.status(200).json({ status: SUCCESS, data: lesson });
  }
);

// createLesson A-day
export const createLesson = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const lesson: ILesson = await Lesson.create({
      group: req.body.group, // required
      teacher: req.body.teacher, // required
      date: req.body.date, // required
      students: req.body.students, // required
    });

    res.status(CREATED).json({ status: SUCCESS, data: lesson });

    // take a record
    await Record.create({
      user: req.user._id,
      actionType: "CREATE",
      entityType: "Lesson",
      entityId: lesson._id,
      description: `Created ${lesson.date.toLocaleDateString()} lesson.`,
      metadata: {},
    });
  }
);

// updateLesson A-day
export const updateLesson = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { id } = req.body || req.params;

    const filtered: Partial<ILesson> = filterout(
      req.body,
      "group",
      "teacher",
      "date"
    );

    if (!id) {
      return next(new CustomError(NOIDPROVIDED, BAD_REQUEST));
    }

    if (!mongoose.isValidObjectId(id)) {
      return next(new CustomError(INVALIDID, BAD_REQUEST));
    }

    const updatedLesson: ILesson | null = await Lesson.findByIdAndUpdate(
      id,
      filtered,
      {
        new: true,
      }
    );

    if (updatedLesson === null) {
      return next(new CustomError(NODOCUMENTFOUND("lesson"), NOT_FOUND));
    }

    res.status(OK).json({ status: SUCCESS, data: updatedLesson });

    // take a record
    await Record.create({
      user: req.user._id,
      actionType: "UPDATE",
      entityType: "Lesson",
      entityId: updatedLesson._id,
      description: `Updated ${updatedLesson.date.toLocaleDateString()} lesson.`,
      metadata: {},
    });
  }
);

// @later  -> take record
// deleteLesson [A-day]s
export const deleteLesson = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    // delete lesson/lessons by array of id
    const id: string[] | undefined = req.body.id;

    if (!id) {
      return next(new CustomError(NOIDPROVIDED, BAD_REQUEST));
    }

    await Lesson.deleteMany({ _id: { $in: id } });

    res.status(NO_CONTENT).json({ status: SUCCESS });
  }
);

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
import { filterout } from "../services/helpers";
import { Record } from "../models/records";

// get "A" groups "A-month?"
export const getLessons = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { date } = req.query; // expects "YYYY-MM-DD" or "YYYY-MM"

    if (!id) {
      return next(new CustomError(NOIDPROVIDED, BAD_REQUEST));
    }

    if (!mongoose.isValidObjectId(id)) {
      return next(new CustomError(INVALIDID, BAD_REQUEST));
    }

    if (!date) {
      return next(new CustomError(NODATEPROVIDED, BAD_REQUEST));
    }

    const month = (date as string).slice(0, 7); // "YYYY-MM"

    const lessons: ILesson[] = await Lesson.find({
      group: id,
      date: { $regex: `^${month}` }, // matches all "YYYY-MM-DD"
    }).sort({ date: 1 });

    res.status(OK).json({
      status: SUCCESS,
      data: lessons,
      results: lessons.length,
    });
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
export const createLessons = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const lessonsData: ILesson[] = req.body.lessons;

    if (!Array.isArray(lessonsData) || lessonsData.length === 0) {
      return next(new CustomError(NODOCUMENTFOUND("lessons"), BAD_REQUEST));
    }

    const lessons = await Lesson.insertMany(lessonsData);

    res.status(CREATED).json({ status: SUCCESS, data: lessons });

    // take records
    await Record.insertMany(
      lessons.map((lesson) => ({
        user: req.user._id,
        actionType: "CREATE",
        entityType: "Lesson",
        entityId: lesson._id,
        description: `Created lesson on ${lesson.date}.`,
        metadata: {},
      }))
    );
  }
);

// updateLesson A-day
export const updateLessons = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const lessonsData: Partial<ILesson>[] = req.body.lessons;

    if (!Array.isArray(lessonsData) || lessonsData.length === 0) {
      return next(new CustomError(NODOCUMENTFOUND("lessons"), BAD_REQUEST));
    }

    const updatedLessons: ILesson[] = [];

    for (const lesson of lessonsData) {
      if (!lesson._id || !mongoose.isValidObjectId(lesson._id)) {
        continue; // skip invalid
      }

      const filtered = filterout(lesson, "group", "teacher", "date");

      const updated = await Lesson.findByIdAndUpdate(lesson._id, filtered, {
        new: true,
      });

      if (updated) {
        updatedLessons.push(updated);

        // take record
        await Record.create({
          user: req.user._id,
          actionType: "UPDATE",
          entityType: "Lesson",
          entityId: updated._id,
          description: `Updated lesson on ${updated.date}.`,
          metadata: {},
        });
      }
    }

    res.status(OK).json({ status: SUCCESS, data: updatedLessons });
  }
);

// @later  -> take record
// deleteLesson [A-day]s
export const deleteLessons = catchAsync(
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

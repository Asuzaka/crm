import { NextFunction, RequestHandler, Response } from "express";
import { catchAsync } from "../services/catchAsync";
import { AuthenticatedRequest } from "../types/route";
import CustomError from "../services/CustomError";
import {
  INVALIDID,
  NODOCUMENTFOUND,
  NOIDPROVIDED,
  NOPERMISSION,
  SUCCESS,
} from "../constants/errors";
import {
  BAD_REQUEST,
  CREATED,
  FORBIDDEN,
  NO_CONTENT,
  NOT_EXTENDED,
  NOT_FOUND,
  OK,
} from "../constants/httpCodes";
import { Student } from "../models/students";
import { IStudent } from "../types/schemas";
import { filterout } from "../services/helpers";
import mongoose from "mongoose";
import { apiFeatures } from "../services/apiFeatures";

export const getStudents = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;

    let query;

    if (!id) {
      // Case for General for students list by pagination
      query = Student.find();
    } else {
      if (!mongoose.isValidObjectId(id)) {
        return next(new CustomError(INVALIDID, BAD_REQUEST));
      }
      // Case for Requesting By Group e.g: "A" under the hood it's just search by mongoID
      query = Student.find({ groups: { $in: id } });
    }

    const features = new apiFeatures(query, req.query)
      .filter()
      .sort()
      .limitFields()
      .pagination();

    const students: IStudent[] = await features.getQuery();

    res
      .status(OK)
      .json({ status: SUCCESS, data: students, results: students.length });
  }
);

export const getStudent = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    // Case for persanal page
    const { id } = req.params;

    if (!id || mongoose.isValidObjectId(id)) {
      return next(new CustomError(INVALIDID, BAD_REQUEST));
    }

    const student: IStudent | null = await Student.findById(id);

    if (student == null) {
      return next(new CustomError(NODOCUMENTFOUND("student"), NOT_FOUND));
    }

    res.status(OK).json({ status: SUCCESS, data: student });
  }
);

export const createStudent = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    // Case request made From "Group"
    // Case request made from general students list
    const student: IStudent = await Student.create({
      name: req.body.name,
      groups: req.body.groups,
      birthDate: req.body.birthDate,
      notess: req.body.notes,
      adress: req.body.adress,
      mothersName: req.body.mothersName,
      mothersNumber: req.body.mothersNumber,
      fathersName: req.body.fathersName,
      fathersNumber: req.body.fathersNumber,
      phoneNumber: req.body.phoneNumber,
      additionalNumber: req.body.additionalNumber,
    });

    res.status(CREATED).json({ status: SUCCESS, data: student });
  }
);

export const updateStudent = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const filtered: Partial<IStudent> = filterout(req.body, "coins");
    const { id } = req.params;


    if(!id){
      return next(new CustomError(NOIDPROVIDED, BAD_REQUEST));
    }

    if(!mongoose.isValidObjectId(id)){
      return next(new CustomError(INVALIDID, BAD_REQUEST));
    }

    const updatedStudent: IStudent | null = await Student.findByIdAndUpdate(id,
      filtered,
      { new: true, runValidators: false }
    );

    if (updatedStudent == null) {
      return next(new CustomError(NODOCUMENTFOUND("student"), NOT_FOUND));
    }

    res.status(OK).json({ status: SUCCESS, data: updatedStudent });
  }
);

export const deleteStudent = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const id: string[] | undefined = req.body.id;

    if (!id) {
      return next(new CustomError(NOIDPROVIDED, BAD_REQUEST));
    }

    await Student.deleteMany({ _id: { $in: id } });

    res.status(NO_CONTENT).json({ status: SUCCESS });
  }
);

// good trick  AuthenticatedRequest["user"]["permissions"] -> the type describing object not runtime object !!
export const requirePermission = (
  permission: keyof AuthenticatedRequest["user"]["permissions"]
): RequestHandler => {
  return (req, res, next) => {
    const authReq = req as AuthenticatedRequest; // cast when needed
    if (!authReq.user || !authReq.user.permissions[permission]) {
      return next(new CustomError(NOPERMISSION, FORBIDDEN));
    }
    next();
  };
};

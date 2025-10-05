import { NextFunction, RequestHandler, Response } from "express";
import { catchAsync } from "../services/catchAsync";
import { AuthenticatedRequest } from "../types/route";
import CustomError from "../services/CustomError";
import {
  INVALIDID,
  INVALIDQUERORNOQUERY,
  NODOCUMENTFOUND,
  NOIDPROVIDED,
  NOPERMISSION,
  SUCCESS,
} from "../constants/errors";
import { BAD_REQUEST, CREATED, FORBIDDEN, NO_CONTENT, NOT_FOUND, OK } from "../constants/httpCodes";
import { Student } from "../models/students";
import { IStudent } from "../types/schemas";
import { filterout } from "../services/helpers";
import mongoose from "mongoose";
import { apiFeatures } from "../services/apiFeatures";
import { Record } from "../models/records";

export const getStudents = catchAsync(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
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

  query = query.populate("groups", "_id name");

  const featuresForCount = new apiFeatures(query, req.query).filter().search(["name", "phoneNumber"]);

  // Count total before pagination
  const totalResults = await featuresForCount.getQuery().clone().countDocuments();

  const featuresForQuery = featuresForCount.sort().limitFields().pagination();

  const students: IStudent[] = await featuresForQuery.getQuery();

  const limit = Number(req.query.limit) || 10;
  const totalPages = Math.ceil(totalResults / limit);

  res.status(OK).json({
    status: SUCCESS,
    data: students,
    results: students.length,
    documents: totalResults,
    pages: totalPages,
  });
});

export const getStudent = catchAsync(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  // Case for persanal page
  const { id } = req.params;

  if (!id) {
    return next(new CustomError(NOIDPROVIDED, BAD_REQUEST));
  }

  if (!mongoose.isValidObjectId(id)) {
    return next(new CustomError(INVALIDID, BAD_REQUEST));
  }

  const student: IStudent | null = await Student.findById(id).populate("groups", "id name");

  if (student == null) {
    return next(new CustomError(NODOCUMENTFOUND("student"), NOT_FOUND));
  }

  res.status(OK).json({ status: SUCCESS, data: student });
});

export const createStudent = catchAsync(async (req: AuthenticatedRequest, res: Response, _next: NextFunction) => {
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
    notes: req.body.notes,
  });

  res.status(CREATED).json({ status: SUCCESS, data: student });

  // take a record
  await Record.create({
    user: req.user._id,
    actionType: "CREATE",
    entityType: "Student",
    entityId: student._id,
    description: `Created "${student.name}" student.`,
    metadata: { groups: student.groups },
  });
});

export const updateStudent = catchAsync(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const filtered: Partial<IStudent> = filterout(req.body, "coins");
  const { id } = req.params;

  if (!id) {
    return next(new CustomError(NOIDPROVIDED, BAD_REQUEST));
  }

  if (!mongoose.isValidObjectId(id)) {
    return next(new CustomError(INVALIDID, BAD_REQUEST));
  }

  const updatedStudent: IStudent | null = await Student.findByIdAndUpdate(id, filtered, {
    new: true,
    runValidators: false,
  });

  if (updatedStudent == null) {
    return next(new CustomError(NODOCUMENTFOUND("student"), NOT_FOUND));
  }

  res.status(OK).json({ status: SUCCESS, data: updatedStudent });

  // take a record
  await Record.create({
    user: req.user._id,
    actionType: "UPDATE",
    entityType: "Student",
    entityId: updatedStudent._id,
    description: `Updated "${updatedStudent.name}" student.`,
    metadata: { groups: updatedStudent.groups },
  });
});

export const deleteStudent = catchAsync(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const id: string[] | undefined = req.body.id;

  if (!id || id.length === 0) {
    return next(new CustomError(NOIDPROVIDED, BAD_REQUEST));
  }

  // find students before deletion (to log info)
  const students = await Student.find({ _id: { $in: id } });

  if (students.length === 0) {
    return next(new CustomError(NODOCUMENTFOUND("students"), NOT_FOUND));
  }

  // delete them
  await Student.deleteMany({ _id: { $in: id } });

  // create audit records
  const records = students.map((student) => ({
    user: req.user._id,
    actionType: "DELETE",
    entityType: "Student",
    entityId: student._id,
    description: `Deleted student "${student.name}".`,
    metadata: {
      groups: student.groups,
    },
  }));

  await Record.insertMany(records);

  res.status(NO_CONTENT).json({ status: SUCCESS });
});

export const searchStudents = catchAsync(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const { query } = req.query;

  if (!query) {
    return next(new CustomError(INVALIDQUERORNOQUERY, BAD_REQUEST));
  }

  const students = await Student.find({
    $or: [{ name: { $regex: query, $options: "i" } }],
  })
    .limit(10)
    .select("_id name");

  res.json({ status: SUCCESS, data: students });
});

// good trick  AuthenticatedRequest["user"]["permissions"] -> the type describing object not runtime object !!
export const requirePermission = (permission: keyof AuthenticatedRequest["user"]["permissions"]): RequestHandler => {
  return (req, res, next) => {
    const authReq = req as AuthenticatedRequest; // cast when needed
    console.log(authReq.user, authReq.user.permissions[permission]);
    if (!authReq.user || !authReq.user.permissions[permission]) {
      return next(new CustomError(NOPERMISSION, FORBIDDEN));
    }
    next();
  };
};

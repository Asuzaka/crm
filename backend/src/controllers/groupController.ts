import { NextFunction, Response } from "express";
import { catchAsync } from "../services/catchAsync";
import { AuthenticatedRequest } from "../types/route";
import { IGroup } from "../types/schemas";
import { Group } from "../models/groups";
import { BAD_REQUEST, CREATED, NO_CONTENT, NOT_FOUND, OK } from "../constants/httpCodes";
import { INVALIDQUERORNOQUERY, INVALIDID, NODOCUMENTFOUND, NOIDPROVIDED, SUCCESS } from "../constants/errors";
import CustomError from "../services/CustomError";
import mongoose from "mongoose";
import { apiFeatures } from "../services/apiFeatures";
import { Record } from "../models/records";
import { Student } from "../models/students";
import { User } from "../models/users";

export const createGroup = catchAsync(async (req: AuthenticatedRequest, res: Response, _next: NextFunction) => {
  // create group
  const group: IGroup = await Group.create({
    name: req.body.name,
    students: req.body.students,
    schedule: req.body.schedule,
    status: req.body.status,
    description: req.body.description,
    start: req.body.start,
    room: req.body.room,
    price: req.body.price,
  });

  if (req.body.students?.length) {
    await Student.updateMany({ _id: { $in: req.body.students } }, { $addToSet: { groups: group._id } });
  }

  if (req.body.teacher) {
    await User.findByIdAndUpdate(req.body.teacher, {
      $push: { responsible: group._id },
    });
  }

  res.status(CREATED).json({ status: SUCCESS, data: group });

  // take a record
  await Record.create({
    user: req.user._id,
    actionType: "CREATE",
    entityType: "Group",
    entityId: group._id,
    description: `Created ${group.name} group.`,
    metadata: {},
  });
});

export const getGroup = catchAsync(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  // get group by id
  const { id } = req.params;

  if (!id) {
    return next(new CustomError(NOIDPROVIDED, BAD_REQUEST));
  }

  if (!mongoose.isValidObjectId(id)) {
    return next(new CustomError(INVALIDID, BAD_REQUEST));
  }

  const group: IGroup | null = await Group.findById(id)
    .populate("students", "_id name")
    .populate("teacher", "_id name");

  if (group === null) {
    return next(new CustomError(NODOCUMENTFOUND("group"), NOT_FOUND));
  }

  res.status(OK).json({ status: SUCCESS, data: group });
});

export const getGroups = catchAsync(async (req: AuthenticatedRequest, res: Response, _next: NextFunction) => {
  // get a list of groups
  const query = Group.find().populate("students", "_id name").populate("teacher", "_id name");

  const featuresForCount = new apiFeatures(query, req.query).filter().search(["name"]);

  // Count total before pagination
  const totalResults = await featuresForCount.getQuery().clone().countDocuments();

  const featuresForQuery = featuresForCount.sort().limitFields().pagination();

  const groups: IGroup[] = await featuresForQuery.getQuery();

  const limit = Number(req.query.limit) || 10;
  const totalPages = Math.ceil(totalResults / limit);

  res.status(OK).json({
    status: SUCCESS,
    data: groups,
    results: groups.length,
    documents: totalResults,
    pages: totalPages,
  });
});

export const updateGroup = catchAsync(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (!id) {
    return next(new CustomError(NOIDPROVIDED, BAD_REQUEST));
  }
  if (!mongoose.isValidObjectId(id)) {
    return next(new CustomError(INVALIDID, BAD_REQUEST));
  }

  // Get old group with students virtual populated (so removal works properly)
  const oldGroup = await Group.findById(id)
    .populate("students", "_id") // ensure students virtual is available
    .select("students");

  if (!oldGroup) {
    return next(new CustomError(NODOCUMENTFOUND("group"), NOT_FOUND));
  }

  const { teacher: newTeacherId, ...filteredBody } = req.body;

  // Update group with new data
  const updatedGroup = await Group.findByIdAndUpdate(id, filteredBody, {
    new: true,
  });
  if (!updatedGroup) {
    return next(new CustomError(NODOCUMENTFOUND("group"), NOT_FOUND));
  }

  // Handle teacher reassignment
  if (newTeacherId) {
    // remove group from old teacher(s)
    await User.updateMany({ responsible: id }, { $pull: { responsible: id } });

    // add group to new teacher
    await User.findByIdAndUpdate(newTeacherId, {
      $addToSet: { responsible: id },
    });
  }

  // Handle students reassignment
  if (req.body.students) {
    // Ensure both arrays are plain string IDs
    const oldStudents = (oldGroup.students ?? []).map((s: any) => (typeof s === "string" ? s : String(s._id)));
    const newStudents = (req.body.students ?? []).map((s: any) => (typeof s === "string" ? s : String(s._id)));

    const toAdd = newStudents.filter((id: string) => !oldStudents.includes(id));
    const toRemove = oldStudents.filter((id: string) => !newStudents.includes(id));

    if (toAdd.length) {
      await Student.updateMany({ _id: { $in: toAdd } }, { $addToSet: { groups: updatedGroup._id } });
    }

    if (toRemove.length) {
      await Student.updateMany({ _id: { $in: toRemove } }, { $pull: { groups: updatedGroup._id } });
    }
  }

  res.status(OK).json({ status: SUCCESS, data: updatedGroup });

  // take a record
  await Record.create({
    user: req.user._id,
    actionType: "UPDATE",
    entityType: "Group",
    entityId: updatedGroup._id,
    description: `Updated ${updatedGroup.name} group.`,
    metadata: {},
  });
});

export const deleteGroup = catchAsync(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  // delete group/groups by array of id
  const id: string[] | undefined = req.body.id;

  if (!id || id.length === 0) {
    return next(new CustomError(NOIDPROVIDED, BAD_REQUEST));
  }

  // find groups before deletion to log their info
  const groups = await Group.find({ _id: { $in: id } });

  if (groups.length === 0) {
    return next(new CustomError("Groups not found", NOT_FOUND));
  }

  // delete them
  await Group.deleteMany({ _id: { $in: id } });

  // take a record
  const records = groups.map((group) => ({
    user: req.user._id,
    actionType: "DELETE",
    entityType: "Group",
    entityId: group._id,
    description: `Deleted group "${group.name}".`,
    metadata: {},
  }));

  await Record.insertMany(records);

  res.status(NO_CONTENT).json({ status: SUCCESS });
});

export const searchGroups = catchAsync(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  // search for groups
  const { query } = req.query;
  if (!query) {
    return next(new CustomError(INVALIDQUERORNOQUERY, BAD_REQUEST));
  }

  const groups = await Group.find({
    name: { $regex: query, $options: "i" },
  })
    .limit(10)
    .select("_id name");

  res.json({ status: SUCCESS, data: groups });
});

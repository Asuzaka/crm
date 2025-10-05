import { NextFunction, Response } from "express";
import { catchAsync } from "../services/catchAsync";
import { AuthenticatedRequest } from "../types/route";
import { IPayment } from "../types/schemas";
import { Payment } from "../models/payments";
import { BAD_REQUEST, CREATED, FORBIDDEN, NO_CONTENT, NOT_FOUND, OK } from "../constants/httpCodes";
import { INVALIDID, NOIDPROVIDED, NOPERMISSION, NODOCUMENTFOUND, SUCCESS } from "../constants/errors";
import CustomError from "../services/CustomError";
import mongoose from "mongoose";
import { getDateRange } from "../services/helpers";
import { apiFeatures } from "../services/apiFeatures";
import { Record } from "../models/records";

// case 1: Global payments // only admin
// case 2: Group payments
// case 3: student payments student id
export const getPayments = catchAsync(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const { id } = req.params;
  // id can be  student/group -> depending on query;
  const { type, date } = req.query;
  // type can be student/group

  // general view only for onwer
  if (!type && req.user.role !== "owner") {
    return next(new CustomError(NOPERMISSION, FORBIDDEN));
  }

  if (!id && req.user.role !== "owner") {
    return next(new CustomError(NOIDPROVIDED, BAD_REQUEST));
  }

  if (!mongoose.isValidObjectId(id) && req.user.role !== "owner") {
    return next(new CustomError(INVALIDID, BAD_REQUEST));
  }

  let query;

  if (type === "student") {
    query = Payment.find({ student: id });
  } else if (type === "group") {
    // need a date also
    const { start, end } = getDateRange(new Date(date as string), "month");
    query = Payment.find({
      group: id,
      createdAt: { $gte: start, $lte: end },
    });
  } else {
    query = Payment.find();
  }

  query = query.populate("student", "_id name").populate("group", "_id name");

  const featuresForCount = new apiFeatures(query, req.query).filter().search(["receiptNumber"]);

  // Count total before pagination
  const totalResults = await featuresForCount.getQuery().clone().countDocuments();

  const featuresForQuery = featuresForCount.sort().limitFields().pagination();

  const payments: IPayment[] = await featuresForQuery.getQuery();

  const limit = Number(req.query.limit) || 10;
  const totalPages = Math.ceil(totalResults / limit);

  res.status(OK).json({
    status: SUCCESS,
    data: payments,
    result: payments.length,
    documents: totalResults,
    pages: totalPages,
  });
});

// personal payment
export const getPayment = catchAsync(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  // id from param  || GET
  const { id } = req.params;

  if (!id) {
    return next(new CustomError(NOIDPROVIDED, BAD_REQUEST));
  }

  if (!mongoose.isValidObjectId(id)) {
    return next(new CustomError(INVALIDID, BAD_REQUEST));
  }

  const payment: IPayment | null = await Payment.findById(id)
    .populate("student", "_id name")
    .populate("group", "_id name");

  if (payment === null) {
    return next(new CustomError(NODOCUMENTFOUND("payment"), NOT_FOUND));
  }

  res.status(OK).json({ status: SUCCESS, data: payment });
});

export const createPayments = catchAsync(async (req: AuthenticatedRequest, res: Response, _next: NextFunction) => {
  const payment: IPayment = await Payment.create({
    group: req.body.group,
    student: req.body.student,
    amount: req.body.amount,
    method: req.body.method,
    createdBy: req.user._id,
  });

  res.status(CREATED).json({ status: SUCCESS, data: payment });

  // take a record
  await Record.create({
    user: req.user._id,
    actionType: "CREATE",
    entityType: "Payment",
    entityId: payment._id,
    description: `Added payment of ${payment.amount} UZS by ${payment.student}.`,
    metadata: { amount: payment.amount, student: payment.student },
  });
});

// permission
export const updatePayments = catchAsync(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const id: string | undefined = req.params.id;

  if (!id) {
    return next(new CustomError(NOIDPROVIDED, BAD_REQUEST));
  }

  if (!mongoose.isValidObjectId(id)) {
    return next(new CustomError(INVALIDID, BAD_REQUEST));
  }

  const payment: IPayment | null = await Payment.findById(id);

  if (payment === null) {
    return next(new CustomError(NODOCUMENTFOUND("payment"), NOT_FOUND));
  }

  res.status(OK).json({ status: SUCCESS, data: payment });

  // take a record
  await Record.create({
    user: req.user._id,
    actionType: "UPDATE",
    entityType: "Payment",
    entityId: payment._id,
    description: `Update payment of ${payment.amount} UZS by ${payment.student}.`,
    metadata: { amount: payment.amount, student: payment.student },
  });
});

// permission
export const deletePayments = catchAsync(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const id: string[] | undefined = req.body.id;

  if (!id || id.length === 0) {
    return next(new CustomError(NOIDPROVIDED, BAD_REQUEST));
  }

  // find payments before deletion for logging
  const payments = await Payment.find({ _id: { $in: id } });

  if (payments.length === 0) {
    return next(new CustomError(NODOCUMENTFOUND("payments"), NOT_FOUND));
  }

  // delete them
  await Payment.deleteMany({ _id: { $in: id } });

  // log each deletion
  const records = payments.map((payment) => ({
    user: req.user._id,
    actionType: "DELETE",
    entityType: "Payment",
    entityId: payment._id,
    description: `Deleted payment of ${payment.amount} UZS by ${payment.student}`,
    metadata: {
      amount: payment.amount,
      method: payment.method,
    },
  }));

  await Record.insertMany(records);

  res.status(NO_CONTENT).json({ status: SUCCESS });
});

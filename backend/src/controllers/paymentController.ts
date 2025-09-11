import { NextFunction, Response } from "express";
import { catchAsync } from "../services/catchAsync";
import { AuthenticatedRequest } from "../types/route";
import { IPayment } from "../types/schemas";
import { Payment } from "../models/payments";
import { BAD_REQUEST, CREATED, FORBIDDEN, NO_CONTENT, NOT_FOUND, OK } from "../constants/httpCodes";
import { INVALIDID, NOIDPROVIDED, NOPERMISSION, NOUSERFOUND, SUCCESS } from "../constants/errors";
import CustomError from "../services/CustomError";
import mongoose from "mongoose";
import { getDateRange } from "../services/helpers";
import { apiFeatures } from "../services/apiFeatures";

// case 1: Global payments // only admin
// case 2: Group payments 
// case 3: student payments student id
export const getPayments = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    // id can be  student/group -> depending on query;
    const { type, date } = req.query;
    // type can be student/group

    // general view only for onwer
    if(!type && req.user.role !=="owner"){
      return next(new CustomError(NOPERMISSION, FORBIDDEN));
    }


    if(!id && req.user.role !=="owner"){
      return next(new CustomError(NOIDPROVIDED, BAD_REQUEST));
    }

    if(!mongoose.isValidObjectId(id) && req.user.role !== "owner"){
      return next(new CustomError(INVALIDID, BAD_REQUEST));
    }

    let query; 


    if(type === "student"){
      query = Payment.find({student: id})
    } else if (type === "group"){
      // need a date also
      const { start, end } = getDateRange(new Date(date as string), "month")
      query = Payment.find({group: id, createdAt : {$gte: start, $lte: end}});
    }  else {
      query = Payment.find()
    }

    // use helper to work with query
    const features = new apiFeatures(query, req.query);

    const payments : IPayment[] = await features.getQuery();


    res.status(OK).json({ status: SUCCESS, data: payments, result: payments.length});
  }
);

// personal payment
export const getPayment = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    // id from param  || GET
    const { id } = req.params;


    if(!id){
      return next(new CustomError(NOIDPROVIDED, BAD_REQUEST));
    }

    if(!mongoose.isValidObjectId(id)){
      return next(new CustomError(INVALIDID, BAD_REQUEST));
    }


    const payment : IPayment | null = await Payment.findById(id);

    if (payment === null){
      return next(new CustomError(NOUSERFOUND("payment"), NOT_FOUND));
    }

  }
);

export const createPayments = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const payment: IPayment = await Payment.create({
      group: req.body.group,
      student: req.body.student,
      amount: req.body.amount,
      method: req.body.method,
      createdBy: req.user._id,
    });

    res.status(CREATED).json({ status: SUCCESS, data: payment });
  }
);

// permission
export const updatePayments = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { id } = req.body || req.params;
    
     if(!id){
      return next(new CustomError(NOIDPROVIDED, BAD_REQUEST));
    }

    if(!mongoose.isValidObjectId(id)){
      return next(new CustomError(INVALIDID, BAD_REQUEST));
    }

    const payment : IPayment | null = await Payment.findById(id);

    if (payment === null){
      return next(new CustomError(NOUSERFOUND("payment"),NOT_FOUND));
    }

    res.status(OK).json({status: SUCCESS, data : payment});
  }
);


// permission
export const deletePayments = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const id : string[] | undefined = req.body.id;

    if(!id){
      return next(new CustomError(NOIDPROVIDED, BAD_REQUEST));
    }
    
    await Payment.deleteMany({ _id: { $in: id } });

    res.status(NO_CONTENT).json({ status: SUCCESS });
  }
);

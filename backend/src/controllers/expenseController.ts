import { NextFunction, Response } from "express";
import { catchAsync } from "../services/catchAsync";
import { AuthenticatedRequest } from "../types/route";
import { IExpense } from "../types/schemas";
import { BAD_REQUEST, CREATED, FORBIDDEN, NO_CONTENT, NOT_FOUND, OK } from "../constants/httpCodes";
import { INVALIDID, NOIDPROVIDED, NOPERMISSION, NODOCUMENTFOUND, SUCCESS } from "../constants/errors";
import CustomError from "../services/CustomError";
import mongoose from "mongoose";
import { apiFeatures } from "../services/apiFeatures";
import { Record } from "../models/records";
import { Expense } from "../models/expense";

// case 1: Global payments // only admin
// case 2: Payments to Staff 
export const getExpenses = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    // id can be staff -> depending on query;

    // general view only for onwer
    if(!id && req.user.role !=="owner"){
      return next(new CustomError(NOPERMISSION, FORBIDDEN));
    }

    if(!mongoose.isValidObjectId(id) && req.user.role !== "owner"){
      return next(new CustomError(INVALIDID, BAD_REQUEST));
    }

    let query; 


    if(id){
      query = Expense.find({manager: id})
    }  else {
      query = Expense.find()
    }

    // use helper to work with query
    const features = new apiFeatures(query, req.query).filter()
      .sort()
      .limitFields()
      .pagination();

    const expenses : IExpense[] = await features.getQuery();


    res.status(OK).json({ status: SUCCESS, data: expenses, result: expenses.length});
  }
);

// personal payment
export const getExpense = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    // id from param  || GET
    const { id } = req.params;


    if(!id){
      return next(new CustomError(NOIDPROVIDED, BAD_REQUEST));
    }

    if(!mongoose.isValidObjectId(id)){
      return next(new CustomError(INVALIDID, BAD_REQUEST));
    }


    const expense : IExpense | null = await Expense.findById(id);

    if (expense === null){
      return next(new CustomError(NODOCUMENTFOUND("expense"), NOT_FOUND));
    }

   res.status(OK).json({status: SUCCESS, data: expense});
  }
);

export const createExpense = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const expense: IExpense = await Expense.create({
       description: req.body.description,
       amount: req.body.amount,
       currency: req.body.currency,
       category: req.body.category,
       recipientType: req.body.recipientType,
       manager: req.body.manager,
       vendorName: req.body.vendorName,
       paymentMethod: req.body.paymentMethod,
       notes: req.body.notes,
       createdBy: req.user._id,
    });

    res.status(CREATED).json({ status: SUCCESS, data: expense });

    // take a record
    await Record.create({
      user: req.user._id,
      actionType: "CREATE",
      entityType: "Expense",
      entityId:  expense._id,
      description: `Added expense of ${expense.amount} UZS.`,
      metadata: { amount: expense.amount },
    })
  }
);

// permission
export const updateExpense = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { id } = req.body || req.params;
    
     if(!id){
      return next(new CustomError(NOIDPROVIDED, BAD_REQUEST));
    }

    if(!mongoose.isValidObjectId(id)){
      return next(new CustomError(INVALIDID, BAD_REQUEST));
    }

    const expense : IExpense | null = await Expense.findByIdAndUpdate(id, req.body);

    if (expense === null){
      return next(new CustomError(NODOCUMENTFOUND("expense"),NOT_FOUND));
    }

    res.status(OK).json({status: SUCCESS, data : expense});

    // take a record
    await Record.create({
     user: req.user._id,
      actionType: "CREATE",
      entityType: "Expense",
      entityId:  expense._id,
      description: `Added expense of ${expense.amount} UZS.`,
      metadata: { amount: expense.amount },
    })
  }
);


// permission
export const deleteExpences = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const id : string[] | undefined = req.body.id;

    if(!id || id.length === 0){
      return next(new CustomError(NOIDPROVIDED, BAD_REQUEST));
    }
    
    // find payments before deletion for logging
    const expenses = await Expense.find({ _id: { $in: id } });

    if (expenses.length === 0) {
      return next(new CustomError(NODOCUMENTFOUND("expence"), NOT_FOUND));
    }

    // delete them
    await Expense.deleteMany({ _id: { $in: id } });

    // log each deletion
    const records = expenses.map((expense) => ({
      user: req.user._id,
      actionType: "DELETE",
      entityType: "Expense",
      entityId: expense._id,
      description: `Deleted payment of ${expense.amount} UZS`,
      metadata: {
        amount: expense.amount,
      },
    }));

    await Record.insertMany(records);

    res.status(NO_CONTENT).json({ status: SUCCESS });
  }
);

import { NextFunction, Response } from "express";
import { catchAsync } from "../services/catchAsync";
import { AuthenticatedRequest } from "../types/route";






export const createGroup = catchAsync(async(req:AuthenticatedRequest, res: Response, next: NextFunction)=>{
})

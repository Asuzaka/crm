import { NextFunction, Request, RequestHandler, Response } from "express";

/**
 * High order function to wrap async route handlers
 */
export const catchAsync = <
  TReq extends Request = Request,
  TRes extends Response = Response
>(
  fn: (req: TReq, res: TRes, next: NextFunction) => Promise<any>
): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(fn(req as TReq, res as TRes, next)).catch(next);
  };
};

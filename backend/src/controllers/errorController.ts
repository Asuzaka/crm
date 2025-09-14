import { NextFunction, Request, Response } from "express";
import CustomError from "../services/CustomError";
import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED,
} from "../constants/httpCodes";
import { EXPIREDTOKEN, INVALIDTOKEN } from "../constants/errors";

export const catchError = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Ensure defaults
  err.status = err.status || "error";
  err.statusCode = err.statusCode || INTERNAL_SERVER_ERROR;

  let error: any = { ...err, message: err.message, stack : err.stack };

  // Handle known errors
  if (error.name === "CastError") {
    error = handleCastErrorDB(error);
  }
  if (error.code === 11000) {
    error = handleDuplicateErrorDB(error);
  }
  if (
    error.name === "ValidationError" ||
    error._message === "User validation failed"
  ) {
    error = handleValidationErrorDB(error);
  }
  if (error.name === "JsonWebTokenError") {
    error = handleJWTError();
  }
  if (error.name === "TokenExpiredError") {
    error = handleJWTExpired();
  }

  // Log unexpected errors
  if (!error.isOperational) {
    console.error("Unexpected Error:", error.stack, error);
  }

  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  });
};

// --- Helpers ---
function handleJWTExpired(): CustomError {
  return new CustomError(EXPIREDTOKEN, UNAUTHORIZED);
}

function handleJWTError(): CustomError {
  return new CustomError(INVALIDTOKEN, UNAUTHORIZED);
}

function handleValidationErrorDB(error: any): CustomError {
  const errors = Object.values(error.errors).map((el: any) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new CustomError(message, BAD_REQUEST);
}

function handleCastErrorDB(err: any): CustomError {
  return new CustomError(`Invalid ${err.path}: ${err.value}`, BAD_REQUEST);
}

function handleDuplicateErrorDB(err: any): CustomError {
  const field = Object.keys(err.keyValue)[0];
  const value = err.keyValue[field];
  return new CustomError(
    `Duplicate ${field}: ${value}. Please use another value!`,
    BAD_REQUEST
  );
}

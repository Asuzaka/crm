import { NextFunction, Response } from "express";
import { catchAsync } from "../services/catchAsync";
import { AuthenticatedRequest } from "../types/route";
import { Payment } from "../models/payments";
import { Expense } from "../models/expense";
import { SUCCESS } from "../constants/errors";
import { OK } from "../constants/httpCodes";
import { Student } from "../models/students";
import { Group } from "../models/groups";

export const yearlyStatsOfMoney = catchAsync(async (req: AuthenticatedRequest, res: Response, _next: NextFunction) => {
  const now = new Date();
  const year = now.getFullYear();

  // January 1st, 00:00:00 of current year
  const yearStart = new Date(year, 0, 1);

  // December 31st, 23:59:59 of current year
  const yearEnd = new Date(year, 11, 31, 23, 59, 59, 999);

  const paymentsStats = await Payment.aggregate([
    {
      $match: {
        createdAt: { $gte: yearStart, $lte: yearEnd },
      },
    },
    {
      $group: {
        _id: { month: { $month: "$createdAt" } },
        totalIncome: { $sum: "$amount" },
      },
    },
    {
      $project: {
        _id: 0,
        month: "$_id.month",
        totalIncome: 1,
      },
    },
    { $sort: { month: 1 } },
  ]);

  const expensesStats = await Expense.aggregate([
    {
      $match: {
        createdAt: { $gte: yearStart, $lte: yearEnd },
      },
    },
    {
      $group: {
        _id: { month: { $month: "$createdAt" } },
        totalExpense: { $sum: "$amount" },
      },
    },
    {
      $project: {
        _id: 0,
        month: "$_id.month",
        totalExpense: 1,
      },
    },
    { $sort: { month: 1 } },
  ]);

  // Build a map for quick lookup
  const statsMap: Record<number, { month: number; income: number; expense: number }> = {};

  for (let i = 1; i <= 12; i++) {
    statsMap[i] = { month: i, income: 0, expense: 0 };
  }

  paymentsStats.forEach((p) => {
    statsMap[p.month].income = p.totalIncome;
  });

  expensesStats.forEach((e) => {
    statsMap[e.month].expense = e.totalExpense;
  });

  // Final array sorted by month
  const finalStats = Object.values(statsMap).sort((a, b) => a.month - b.month);

  res.status(OK).json({ status: SUCCESS, data: finalStats });
});

export const yearlyStatsOfMethods = catchAsync(
  async (req: AuthenticatedRequest, res: Response, _next: NextFunction) => {
    const now = new Date();
    const year = now.getFullYear();

    const yearStart = new Date(year, 0, 1);
    const yearEnd = new Date(year, 11, 31, 23, 59, 59, 999);

    const methodStats = await Payment.aggregate([
      {
        $match: {
          createdAt: { $gte: yearStart, $lte: yearEnd },
        },
      },
      {
        $group: {
          _id: "$method",
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$count" },
          methods: { $push: { method: "$_id", count: "$count" } },
        },
      },
      {
        $unwind: "$methods",
      },
      {
        $project: {
          _id: 0,
          method: "$methods.method",
          count: "$methods.count",
          percent: {
            $multiply: [{ $divide: ["$methods.count", "$total"] }, 100],
          },
        },
      },
    ]);

    res.status(OK).json({ status: SUCCESS, data: methodStats });
  },
);

export const getStats = catchAsync(async (req: AuthenticatedRequest, res: Response, _next: NextFunction) => {
  // total students and groups
  const [studentsCount, groupsCount] = await Promise.all([Student.countDocuments(), Group.countDocuments()]);

  const topGroups = await Student.aggregate([
    { $unwind: "$groups" }, // expand the groups array
    {
      $group: {
        _id: "$groups", // group id
        studentCount: { $sum: 1 },
      },
    },
    { $sort: { studentCount: -1 } },
    { $limit: 5 },
    {
      $lookup: {
        from: "groups", // collection name in Mongo
        localField: "_id",
        foreignField: "_id",
        as: "group",
      },
    },
    { $unwind: "$group" },
    {
      $project: {
        _id: 0,
        groupId: "$group._id",
        group: "$group.name",
        studentCount: 1,
      },
    },
  ]);

  res.status(OK).json({
    status: SUCCESS,
    data: { studentsCount, groupsCount, topGroups },
  });
});

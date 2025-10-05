import express from "express";
import { protect } from "../middleware/protect";
import {
  createExpense,
  getExpenses,
  getExpense,
  deleteExpences,
  updateExpense,
} from "../controllers/expenseController";

const router = express.Router();

// auth
router.use(protect);

router.route("/").get(getExpenses).post(createExpense);
router.route("/:id").get(getExpense).patch(updateExpense).delete(deleteExpences);
router.route("/s/:id").get(getExpenses);

export { router };

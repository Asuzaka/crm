import express from "express";
import { protect } from "../middleware/protect";
import {
  getStats,
  yearlyStatsOfMethods,
  yearlyStatsOfMoney,
} from "../controllers/statsController";

const router = express.Router();

// auth
router.use(protect);

router.route("/").get(getStats);
router.route("/money").get(yearlyStatsOfMoney);
router.route("/methods").get(yearlyStatsOfMethods);

export { router };

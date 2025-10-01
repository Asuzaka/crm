import express from "express";
import { protect } from "../middleware/protect";
import {
  createPayments,
  deletePayments,
  getPayment,
  getPayments,
  updatePayments,
} from "../controllers/paymentController";
import { requirePermission } from "../controllers/studentController";

const router = express.Router();

// auth
router.use(protect);

router
  .route("/")
  .get(getPayments)
  .post(requirePermission("addPayments"), createPayments);
router
  .route("/:id")
  .get(getPayment)
  .patch(requirePermission("addPayments"), updatePayments)
  .delete(requirePermission("addPayments"), deletePayments);
router.route("/s/:id").get(getPayments);

export { router };

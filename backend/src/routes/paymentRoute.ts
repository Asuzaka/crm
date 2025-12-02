import express from "express";
import { protect } from "../middleware/protect";
import {
  createPayments,
  deletePayments,
  getPayment,
  getPayments,
  updatePayments,
} from "../controllers/paymentController";
import { acessTo } from "../controllers/authController";

const router = express.Router();

// auth
router.use(protect);

router.route("/").get(getPayments).post(acessTo("owner"), createPayments);
router
  .route("/:id")
  .get(getPayment)
  .patch(acessTo("owner"), updatePayments)
  .delete(acessTo("owner"), deletePayments);
router.route("/s/:id").get(getPayments);

export { router };

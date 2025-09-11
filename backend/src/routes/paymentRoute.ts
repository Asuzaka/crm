import express from "express";
import { protect } from "../middleware/protect";
import { createPayments, deletePayments, getPayment, getPayments, updatePayments } from "../controllers/paymentController";

const router = express.Router();

// auth
router.use(protect)


router.route("/").get(getPayments).post(createPayments);
router.route("/:id").get(getPayment).patch(updatePayments).delete(deletePayments);
router.route("/s/:id").get(getPayments);

export { router };

import express from "express";
import {
  createStudent,
  deleteStudent,
  getStudent,
  getStudents,
  requirePermission,
  updateStudent,
} from "../controllers/studentController";
import { protect } from "../middleware/protect";

const router = express.Router();


// auth
router.use(protect);

router
  .route("/")
  .get(getStudents)
  .post(requirePermission("addStudents"), createStudent);
router.route("/group/:id").get(getStudents);
router
  .route("/:id")
  .get(getStudent)
  .patch(requirePermission("addPayments"), updateStudent)
  .delete(requirePermission("deleteStudents"), deleteStudent);

export { router };

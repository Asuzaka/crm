import express from "express";
import {
  createStudent,
  deleteStudent,
  getStudent,
  getStudents,
  requirePermission,
  searchStudents,
  updateStudent,
} from "../controllers/studentController";
import { protect } from "../middleware/protect";

const router = express.Router();

// auth
router.use(protect);

router
  .route("/")
  .get(requirePermission("students", "access"), getStudents)
  .post(requirePermission("students", "create"), createStudent)
  .delete(requirePermission("students", "delete"), deleteStudent);
router.route("/group/:id").get(requirePermission("students", "access"), getStudents);
router.route("/search").get(searchStudents);
router.route("/:id").get(getStudent).patch(requirePermission("students", "update"), updateStudent);

export { router };

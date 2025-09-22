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
  .get(getStudents)
  .post(requirePermission("addStudents"), createStudent).delete(requirePermission("deleteStudents"), deleteStudent);
router.route("/group/:id").get(getStudents);
router.route("/search").get(searchStudents);
router
  .route("/:id")
  .get(getStudent)
  .patch(requirePermission("addStudents"), updateStudent)


export { router };

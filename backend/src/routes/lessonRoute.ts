import express from "express";
import { protect } from "../middleware/protect";
import {
  createLessons,
  deleteLessons,
  getLesson,
  getLessons,
  updateLessons,
} from "../controllers/lessonsController";

const router = express.Router();

// auth
router.use(protect);

router
  .route("/")
  .post(createLessons)
  .delete(deleteLessons)
  .patch(updateLessons);
router.route("/group/:id").get(getLessons);
router.route("/:id").get(getLesson);

export { router };

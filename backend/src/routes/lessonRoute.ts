import express from "express";
import { protect } from "../middleware/protect";
import { createLesson, deleteLesson, getLesson, getLessons, updateLesson } from "../controllers/lessonsController";


const router = express.Router();


router.use(protect);

router.route("/").post(createLesson);
router.route("/group/:id").get(getLessons);
router.route("/:id").get(getLesson).patch(updateLesson).delete(deleteLesson);


export { router };

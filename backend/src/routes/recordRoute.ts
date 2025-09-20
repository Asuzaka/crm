import express from "express";
import { protect } from "../middleware/protect";
import { getRecord, getRecords } from "../controllers/recordController";

const router = express.Router();

router.use(protect)

router.route("/").get(getRecords);
router.route("/:id").get(getRecord);
router.route("/user/:id").get(getRecords);

export { router };

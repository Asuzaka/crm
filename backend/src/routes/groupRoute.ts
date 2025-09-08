import express from "express"
import { protect } from "../middleware/protect";
import { createGroup, deleteGroup, getGroup, getGroups, updateGroup } from "../controllers/groupController";
import { acessTo } from "../controllers/authController";

const router = express.Router();

router.use(protect);

router.route("/").get(getGroups).post(acessTo("owner"), createGroup);
router.route("/:id").get(getGroup).patch(acessTo("owner"), updateGroup).delete(acessTo("owner"), deleteGroup);

export { router };

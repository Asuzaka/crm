import express from "express"
import { protect } from "../middleware/protect";
import { createGroup, deleteGroup, getGroup, getGroups, searchGroups, updateGroup } from "../controllers/groupController";
import { acessTo } from "../controllers/authController";

const router = express.Router();

// auth
router.use(protect);

router.route("/").get(getGroups).post(acessTo("owner"), createGroup).delete(acessTo("owner"), deleteGroup);
router.route("/search").get(searchGroups);
router.route("/:id").get(getGroup).patch(acessTo("owner"), updateGroup);


export { router };

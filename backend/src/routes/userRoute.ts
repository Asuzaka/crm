import express from "express";
import { protect } from "../middleware/protect";
import { acessTo } from "../controllers/authController";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateMe,
  updateUser,
} from "../controllers/userController";

const router = express.Router();

// auth
router.use(protect);

router
  .route("/")
  .get(acessTo("owner"), getUsers)
  .post(acessTo("owner"), createUser)
  .delete(acessTo("owner"), deleteUser)
  .patch(updateMe);
router.route("/:id").get(getUser).patch(acessTo("owner"), updateUser);

export { router };

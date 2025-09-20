import { authenticated, login, logout } from "../controllers/authController";
import express from "express";
import { bodyExitst, protect } from "../middleware/protect";

const router = express.Router();

router.route("/authenticated").get(protect, authenticated);
router.route("/login").post(bodyExitst, login);
router.route("/logout").get(protect, logout);

export { router };

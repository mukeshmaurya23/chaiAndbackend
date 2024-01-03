import userController from "../controllers/user.controllers.js";

import { Router } from "express";

const router = Router();

router.route("/login").post(userController);

export default router;

import { Router } from "express";
import { UserModel } from "../dao/models/user.model.js";
import { checkRole } from "../middlewares/auth.js";
import { PremiumController } from "../controllers/user.controller.js";

const router = Router();

router.put("/premium/:uid", checkRole(["admin"]) ,PremiumController);

export {router as usersRouter};
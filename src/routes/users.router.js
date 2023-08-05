import { Router } from "express";
import { UserModel } from "../dao/models/user.model.js";
import { checkRole } from "../middlewares/auth.js";
import { DocumentController, PremiumController, deleteOldUsersCapture, getUserController  } from "../controllers/user.controller.js";
import { checkAuthenticated } from "../middlewares/auth.js";
import { uploaderDocument } from "../utils.js";

const router = Router();

router.get("/", getUserController);

router.delete("/", deleteOldUsersCapture);

router.put("/premium/:uid", checkRole(["admin"]) ,PremiumController);

router.put("/:uid/documents", checkAuthenticated , uploaderDocument.fields([{name:"identificacion",maxCount:1}, {name:"domicilio",maxCount:1},{name:"estadoDeCuenta",maxCount:1}]), DocumentController);


export {router as usersRouter};
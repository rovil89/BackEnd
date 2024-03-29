import { Router } from "express";
import { UserModel } from "../dao/models/user.model.js";
import {UserManagerMongo} from "../dao/db-managers/userManagerMongo.js";
import { generateEmailToken, verifyEmailToken, isValidPassword, createHash, uploaderProfile } from "../utils.js";
import passport from "passport";
import jwt from "jsonwebtoken";
import { options } from "../config/options.js";
import { ResetController, ForgotController, UserByIdController, CurrentUserController, PushUserController, UserController, SignupController, FailSignupController, LoginController, GithubPassportController, GithubCallBackPassportController, GithubResCallback, LogoutPassportController, Logout } from "../controllers/auth.controller.js";
import { sendRecoveryPass } from "../utils/email.js";

const router = Router();
const userManager = new UserManagerMongo(UserModel);

// Rutas de autenticacion

// AUTENTICACION GITHUB
router.get("/github", GithubPassportController);
router.get("/github-callback", GithubCallBackPassportController, GithubResCallback);


router.post("/signup",uploaderProfile.single("avatar"), SignupController);
router.get("/failure-signup", FailSignupController);
router.post("/login", LoginController);
router.post("/logout", LogoutPassportController, Logout);
router.get("/current", CurrentUserController);

//DAO
router.get("/", UserController);
router.post("/", PushUserController);
router.get("/:id", UserByIdController);

router.post("/forgot-password", ForgotController);

router.post("/reset-password", ResetController);

// router.post("/logout", (req, res) => {
//     req.logOut(error => {
//         if(error) {return res.send("No se pudo cerrar la sesion");
//     } else { 
//         //req.session.destroy elimina la sesion del usuario de la memoria del servidor y de la base de datos
//         req.session.destroy(err => {
//             if(err) return res.send("No se pudo cerrar la sesion");
//             res.send("Sesion finalizada");
//             })
//         }
//     })
// });



export {router as AuthRouter}
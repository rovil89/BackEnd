import { Router } from "express";
import { UserModel } from "../dao/models/user.model.js";
import {UserManagerMongo} from "../dao/db-managers/userManagerMongo.js";
import { generateEmailToken, verifyEmailToken, isValidPassword, createHash } from "../utils.js";
import passport from "passport";
import jwt from "jsonwebtoken";
import { options } from "../config/options.js";
import { UserByIdController, CurrentUserController, PushUserController, UserController, SignupController, FailSignupController, LoginController, GithubPassportController, GithubCallBackPassportController, GithubResCallback, LogoutPassportController, Logout } from "../controllers/auth.controller.js";
import { sendRecoveryPass } from "../utils/email.js";

const router = Router();
const userManager = new UserManagerMongo(UserModel);

// Rutas de autenticacion

// AUTENTICACION GITHUB
router.get("/github", GithubPassportController);
router.get("/github-callback", GithubCallBackPassportController, GithubResCallback);


router.post("/signup", SignupController);
router.get("/failure-signup", FailSignupController);
router.post("/login", LoginController);
router.post("/logout", LogoutPassportController, Logout);
router.get("/current", CurrentUserController);

//DAO
router.get("/", UserController);
router.post("/", PushUserController);
router.get("/:id", UserByIdController);

router.post("/forgot-password", async(req, res) => {
    try {
        const {email} = req.body;
        //verificamos que exista el usuario
        const user = await UserModel.findOne({email:email});
        if(!user){
            return res.send(`<div> Error <a href="/forgot-password"> Intente denuevo el usuario no existe</a><div>`);
        }
        //Si el usuario existe, generamos el token del enlace
        const token = generateEmailToken(email, 3*60); //la duracion del enlace son 3 minutos (3*60 segundos)
        await sendRecoveryPass(email, token);
        res.send("Se envió un correo a su cuenta para restablecer la contraseña, regresar <a href=/login>al login </a>")
    } catch (error) {
        req.logger.error("error en forgot-password"+error);
        res.send(`<div> Error <a href="/forgot-password"> Intente otra vez</a><div>`)
    }
});

router.post("/reset-password", async(req, res) => {
    try {
        const token = req.query.token;
        const {email, newPassword} = req.body;
        //validamos el token(xsi se paso el tiempo de duracion de ese token)
        const validEmail = verifyEmailToken(token);
        if(!validEmail){
            return res.send(`El enlace ya no es valido, genere un nuevo enlace para recuperar la contraseña <a href="/forgot-password">Recuperar contraseña</a>`)
        }
        const user = await UserModel.findOne({email:email});
        if(!user){
            req.send("El usuario no esta registrado")
        }
        if(isValidPassword(newPassword, user)){
            return res.send("No puedes usar la misma contraseña");
        }
        const userData = {
            ...user._doc,
            password: createHash(newPassword)
        }
        const userUpdate = await UserModel.findOneAndUpdate({email:email}, userData);
        res.render("login",{message:"Contraseña actualizada"});
    } catch (error) {
        res.send(error.message);
    }
});

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
import { Router } from "express";
import { UserModel } from "../dao/models/user.model.js";
import {UserManagerMongo} from "../dao/db-managers/userManagerMongo.js";
import { createHash, isValidPassword } from "../utils.js";
import passport from "passport";
import jwt from "jsonwebtoken";
import { options } from "../config/options.js";

const router = Router();
const userManager = new UserManagerMongo(UserModel);

// Rutas de autenticacion

// AUTENTICACION GITHUB
router.get("/github", passport.authenticate("githubSignup"));

router.get("/github-callback", passport.authenticate("githubSignup", {
    failureRedirect:"/api/sessions/failure-signup" //si falla lo redirecciona a esa ruta
}), (req, res) => {
    res.send("Usuario Autenticado")
});

router.get("/failure-signup", (req, res) => {
    res.send("No fue posible registrar el usuario");
});


router.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await userManager.getUserByEmail(email);
    
        if(user){
            console.log(user);
            if(isValidPassword(user, password)) {
                const token = jwt.sign({_id: user._id, first_name: user.first_name, email: user.email, role: user.role},             options.server.secretToken, {expiresIn: "24h"}); //expira el token en 24 hs
                console.log("Token", token)
                res.cookie(options.server.cookieToken, token, {
                httpOnly: true //para q no sea accesible  el navegador el token (es x seguridad)
            }).redirect("/products"); //para que las cookies queden en el navegador
            } else { 
                res.send(`Credenciales invalidas <a href="/login">Inicia sesion </a>`)
            }
        }
    // si ya existe enviamos un msj que el usuario ya existe
    res.send(`Usuario ya registrado <a href="/login">Inicia sesion </a>`);
    } catch (error) {
        console.log(error);
    }
});


router.post("/signup",async(req, res)=>{ 
    try {
        const {first_name, last_name,age ,  email, password} = req.body;
        const user = await userManager.getUserByEmail(email);
        if(!user){
            let role='user';
            if (email.endsWith("@somospacifica.com")) {
                role = "admin";
            }
            const newUser = {
                first_name,
                last_name,
                email,
                age,
                password:createHash(password),
                role
            };
            const userCreated = await userManager.addUser(newUser);
            const token = jwt.sign({_id: userCreated._id, first_name: userCreated.first_name, email: userCreated.email, role: userCreated.role},             options.server.secretToken, {expiresIn: "24h"}); //expira el token en 24 hs
            console.log("Token", token)
            res.cookie(options.server.cookieToken, token, {
                httpOnly: true //para q no sea accesible  el navegador el token (es x seguridad)
            }).redirect("/products"); //para que las cookies queden en el navegador
        }else{
            res.send(`<div> El usuario ya esta registrado, <a href="/login">Loguearse</a></div>`);
        }
    } catch (error) {
        res.json({status:"error", message: error.message});
    }
});

// router.get("/logout", (req, res) => {
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

router.post("/logout", passport.authenticate("authJWT",{session:false}) , (req, res) => {
    if(req.user){
        req.logout((error)=>{
            if(error) return res.send("La session no se pudo cerrar");
            res.clearCookie(options.server.cookieToken).send("sesion finalizada")
        })
    }
});

export {router as AuthRouter}
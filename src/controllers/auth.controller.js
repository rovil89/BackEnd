import { UserModel } from "../dao/models/user.model.js";
import {UserManagerMongo} from "../dao/db-managers/userManagerMongo.js";
import passport from "passport";
import { createHash, isValidPassword } from "../utils.js";
// import jwt from "passport-jwt";
import { options } from "../config/options.js";
import jwt from "jsonwebtoken";
import {authDao} from "../dao/factory.js";
import {userService} from "../repository/index.js";
import {}

const userManager = new UserManagerMongo(UserModel);

export const UserController = async(req, res) => {
    try {
        const users = await userService.getUsers(); //esto deberia devolverme todos los usuarios
        res.json({status: "success", payload: users }); //payload hace referencia al resultado de la peticion
    } catch (error) {
        res.json({status:"error", message: error.message});
    }
};

export const PushUserController = async(req, res) => {
    try {
        const userCreated = await userService.createUser(req.body); 
        res.json({status: "success", payload: userCreated }); //payload hace referencia al resultado de la peticion
    } catch (error) {
        res.json({status:"error", message: error.message});
    }
};

export const UserByIdController = async(req, res) => {
    try {
        const user = await userService.getUser(req.params.id);
        res.json({status: "success", payload: user}); //payload hace referencia al resultado de la peticion
        if(Number.isNaN(id)){ 
            CustomError.createError({
                name: "user get by id error",
                cause: generateUserErrorParam(id),
                message: "eeror obteniendo el usuario por el id",
                errorCode: EEror.INVALID_PARAM
            })}
    } catch (error) {
        res.json({status:"error", message: error.message});
    }
};
export const SignupController = async(req, res)=>{ 
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
};

export const FailSignupController = (req, res) => {
    res.send("No fue posible registrar el usuario");
};

export const LoginController = async (req, res) => {
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
};

export const GithubPassportController = passport.authenticate("githubSignup");

export const GithubCallBackPassportController = passport.authenticate("githubSignup", {
    failureRedirect:"/api/sessions/failure-signup" //si falla lo redirecciona a esa ruta
});

export const GithubResCallback = (req, res) => {
    res.send("Usuario Autenticado")
};

export const LogoutPassportController = passport.authenticate("authJWT",{session:false}); 

export const Logout = (req, res) => {
    if(req.user){
        req.logout((error)=>{
            if(error) return res.send("La session no se pudo cerrar");
            res.clearCookie(options.server.cookieToken).send("sesion finalizada")
        })
    }
};

export const CurrentUserController = async (req, res) => {
    if(req.session.user){
        return res.send({userInfo: req.session})
    }
    res.send("Usuario no Logueado")
}
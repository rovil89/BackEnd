import { UserModel } from "../dao/models/user.model.js";
import {UserManagerMongo} from "../dao/db-managers/userManagerMongo.js";
import passport from "passport";
import { createHash, isValidPassword } from "../utils.js";
import { options } from "../config/options.js";
import jwt from "jsonwebtoken";
import { userService } from "../repository/index.js";
import { CustomError } from "../services/curstomError.service.js";
import { Errors } from "../enums/Errors.js";
import { generateUserErrorInfo } from "../services/userErrorInfo.js";
import { generateUserErrorParam } from "../services/userErrorParams.js";

// import jwt from "passport-jwt";

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
                message: "error obteniendo el usuario por el id",
                errorCode: Errors.INVALID_PARAM
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
            if(!first_name || !last_name || !email || !age ){
                CustomError.createError({ //todos estos items que agregamos son los que creamos en el customError.service
                    name: "User create error",
                    cause: generateUserErrorInfo(req.body), //eso lo creamos es userErrorInfo.js
                    message: "Error creando el usuario",
                    errorCode:Errors.INVALID_JSON  //los que creamos en el EEror.js
                })};
            const userCreated = await userManager.addUser(newUser);
            const token = jwt.sign({_id: userCreated._id, first_name: userCreated.first_name, email: userCreated.email, role: userCreated.role},options.server.secretToken, {expiresIn: "24h"}); //expira el token en 24 hs
            // console.log("Token", token)
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
        const user = {...req.user};
        user.last_connection = new Date();
        req.logout(async(error)=>{
            if(error) return res.send("La session no se pudo cerrar");
            const userUpdated = await UserModel.findByIdAndUpdate(user._id,user);
            res.clearCookie(options.server.cookieToken).send("sesion finalizada")
        })
    }
};

export const CurrentUserController = async (req, res) => {
    if(req.session.user){
        return res.send({userInfo: req.session})
    }
    res.send("Usuario no Logueado")
};

export const ForgotController =  async(req, res) => {
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
};


export const ResetController = async(req, res) => {
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
};
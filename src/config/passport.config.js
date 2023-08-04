import passport from "passport";
import LocalStrategy from "passport-local";
import GithubStrategy from "passport-github2";
import { UserModel } from "../dao/models/user.model.js";
import { createHash } from "../utils.js";
import jwt from "passport-jwt";
import { options } from "./options.js";

const jwtStrategy = jwt.Strategy;  // creo la estrategia
const ExtractJWT =  jwt.ExtractJwt; //extrae el token de la cookie

export const initializePassport = ()=>{
    //creamos la estrategia con passport jwt, autenticamos mediante passport
    passport.use("authJWT", new jwtStrategy(
        {
            //extrae el token de la cookie
            jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
            secretOrKey: options.server.secretToken
        },
        async(jwt_payload, done ) => {  //jwt:payload es la info que extraemos del token
            try {
                return done(null, jwt_payload);
                user.last_connection = new Date(); 
            } catch (error) {
                return done(error);
            }
        }
    ));

    passport.use("loginStrategy", new LocalStrategy(
        {
            usernameField:"email"
        },
        async (username, password, done)=>{
            try {
                const user = await UserModel.findOne({email:username});
                if(!user){
                    return done(null, false);
                }
                //usuario existe, validar contraseña
                if(!isValidPassword(password, user)) return done(null, false);
                //modificar last_connection del usuario que se loguea
                user.last_connection = new Date();
                const userUpdated = await UserModel.findByIdAndUpdate(user._id,user);
                return done(null, userUpdated);
            } catch (error) {
                return done(error);
            }
        }
    ));

}

export const cookieExtractor = (req) => {
    let token = null;
    if(req && req.cookies) {
        //extraemos el token de la cookie
        token = req.cookies[options.server.cookieToken]
    } 
    return token;
}


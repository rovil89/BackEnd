import passport from "passport";
import LocalStrategy from "passport-local";
import GithubStrategy from "passport-github2";
import { UserModel } from "../dao/models/user.model.js";
import { createHash } from "../utils.js";

const initializedPassport = () => {
    passport.use( "signupStrategy", new LocalStrategy(
        //(identificador de la estrategia, la estrategia )
        {
            usernameField: "email",
            passReqToCallback: true
        },
        async  (req, username, password, done) => {
            try {
                const { name, age} = req.body;
                const user = await UserModel.findOne({email:username});
                if(user) {
                    return done (null, false) //done(null aunque no haya errores, false xq no se creo un usuario nuevo)
                }
                // si no existe el usuario en la base de datos, creamos uno nuevo
                const newUser = {
                    name, 
                    age,
                    email: username,
                    password: createHash(password)
                };
                const userCreated = await UserModel.create(newUser);
                return done (null, userCreated); //userCreated xq se creo un usuario
            } catch (error) {
                return done (error);
            }
        }
    ))

    // Autenticacion GITHUB
    passport.use("githubSignup", new GithubStrategy(
        {
            clientID: "Iv1.3c6044dc5e89d2ef",
            clientSecret: "b79d79645cdfc64480313016846b43c82b7e3c52",
            callbackURL: "http://localhost:8080/api/sessions/github-callback"
        },
        async (accessToken, refreshToken, profile, done ) => {
            try {
                console.log("profile", profile)
                const userExists = await UserModel.findOne({email: profile.username});
                //si lo encuentra es xq se logueo con github, y devuelve al mismo
                if(userExists){
                    return done(null, userExists)
                }
                //Si no lo encuentra crea un nuevo usuario
                const newUser = {
                    name:profile.displayName,
                    age:null,
                    email:profile.username,
                    password:createHash(profile.id)
                };
                const userCreated = await UserModel.create(newUser);
                return done(null, userCreated) //para ese usuario creado se le crea una session
            } catch (error) {
                return done(error)
            }
        }
    ))

    // Serializar y deserializar usuarios
    passport.serializeUser((user, done) => {
        done( null, user._id);
    });

    passport.deserializeUser( async (id, done) => {
        const user = await UserModel.findById(id);
        return done(null, user); 
    });
}

export { initializedPassport }
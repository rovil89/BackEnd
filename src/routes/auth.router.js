import { Router } from "express";
import { UserModel } from "../dao/models/user.model.js";
import { createHash } from "../utils.js";
import passport from "passport";

const router = Router();

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
    const user = await UserModel.findOne({email:email});
    
    if(!user){
        // si no existe el usuario lo registranis
        const newUser = {
            email,
            password: createHash(password)//para encriptar la contraseña
        }
        const userCreated = await UserModel.create(newUser);
        req.session.user = userCreated.email;
        // res.send("Usuario Logueado");
        res.redirect("/profile")
    }
    // si ya existe enviamos un msj que el usuario ya existe
    res.send(`Usuario ya registrado <a href="/login">Inicia sesion </a>`);
    } catch (error) {
        console.log(error);
    }
});
router.post("/signup", async (req, res) => {
    try {
    const {first_name, last_name, age, email, password} = req.body;
    const newUser = await UserModel.create({first_name, last_name, age, email, password});
    req.session.user= newUser.email;
    
    res.redirect("/products");
    // res.send("Usuario Logueado");
    } catch (error) {
        console.log(error);
    }
});

router.get("/logout", (req, res) => {
    req.logOut(error => {
        if(error) {return res.send("No se pudo cerrar la sesion");
    } else { 
        //req.session.destroy elimina la sesion del usuario de la memoria del servidor y de la base de datos
        req.session.destroy(err => {
            if(err) return res.send("No se pudo cerrar la sesion");
            res.send("Sesion finalizada");
            })
        }
    })
});

router.post("/logout", (req, res) => {
    req.session.destroy(error => {
        if(error) return res.send("La session no se pudo cerrar");
        res.redirect("/signup");
    })
})

export {router as AuthRouter}
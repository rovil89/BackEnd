import { Router } from "express";
import { UserModel } from "../dao/models/user.model.js";

const router = Router();

// Rutas de autenticacion
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

router.post("/logout", (req, res) => {
    req.session.destroy(error => {
        if(error) return res.send("La session no se pudo cerrar");
        res.redirect("/signup");
    })
})

export {router as AuthRouter}
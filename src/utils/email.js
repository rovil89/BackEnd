import nodemailer from "nodemailer";
import {options} from "../config/options.js";

//crear un transportador para enviar ese mail
const transporter = nodemailer.createTransport({
    service: "gmail",
    port:587,
    auth:{
        user: options.gmail.emailAdmin,
        pass:options.gmail.emailPass,
    },
    secure:false,
    tls:{
        rejectUnauthorized:false
    } //secure y tls en false son para que no me pida la seguridadde gmail
});

//generar el enlace para el correo que recupera la contraseña
export const sendRecoveryPass = async(userEmail, token) => {
    const link = `http://localhost:8080/reset-password?token=${token}` //ruta donde redirigimos al usuario para recuperar el password
    
    //estructura del correo que vamos a enviar
    await transporter.sendMail({
        from:options.gmail.emailAdmin, //quien envia el correo
        to:userEmail,
        subject:"Restablecer contraseña",
        html:`
            <div>
                <h2>Ha solicitado un cambio de contraseña</h2>
                <p> Da click en el sig enlace para restablecer la contraseña</p>
                <a href="${link}">
                    <button> Restablecer contraseña </button>   
                </a>
            </div>
            `
    })
}
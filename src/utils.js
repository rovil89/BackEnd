import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
import {faker, Faker, es, en} from "@faker-js/faker";
import jwt from "jsonwebtoken";
import {options } from "./config/options.js";
import multer from "multer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;

export const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync())
}; //crea el hash de la contraseña

export const isValidPassword= (user, loginPassword) => {
    return bcrypt.compareSync(loginPassword, user.password);
};

export const generateEmailToken = (email, expireTime) => {
    const token = jwt.sign({email}, options.gmail.emailToken, {expiresIn:expireTime});
    return token;
}; //para recuperar la contraseña, guardamos el {email} en jwt.sign ; usamos gmail para los mail, y el tiempo de expiracion 

export const verifyEmailToken = (token) => {
    try {
        const info = jwt.verify(token, options.gmail.emailToken);
        return info.email;
    } catch (error) {
        console.log(error.message);
        return null;
    }
}

export const customFaker = new Faker ({
    locale: [es], //"es" es para que me muestre los datos en español, "en" es en ingles
});

const { commerce, database, string } = customFaker;

export const generateProducts = () => {
    return {
        id: database.mongodbObjectId(),
        title: commerce.productName(),
        // description: commerce.productDescription(),
        price: parseFloat(commerce.price()),
        stock: parseInt(string.numeric(2)),
        code: string.alphanumeric(10),
        
    }
};

//configuracion para guardar imagenes usuarios
const validFields = (body)=>{
    const {name,email,password} = body;
    if(!name || !email || !password){
        return false;
    } else {
        return true
    }
}; //validacion de los datos

//filtro para validar los campos antes de cargar la imagen
const multerFilterProfile = (req,file,cb)=>{
    const isValid = validFields(req.body);
    if(!isValid){
        cb(null, false)
    } else {
        cb(null, true)
    }
};

const profileStorage = multer.diskStorage({
    //donde voy a guardar los archivos
    destination: function(req,file,cb){ //cb = callback
        cb(null,path.join(__dirname,"/multer/users/images")) //ruta donde guardamos los archivo ,dirname hace referencia a la carpeta SRC
    },
    //que nombre tendra el archivo que guardamos
    filename: function(req,file,cb){
        cb(null,`${req.body.email}-perfil-${file.originalname}`)//ORIGINALNAME es quien tiene el nombre original de la imagen, x eso es recomendable dejarla al final
    }
});
//creamos el uploader de multer
export const uploaderProfile = multer({storage:profileStorage, fileFilter:multerFilterProfile});


//configuracion para guardar documentos de los usuarios
const documentStorage = multer.diskStorage({
    //donde voy a guardar los archivos
    destination: function(req,file,cb){
        cb(null,path.join(__dirname,"/multer/users/documents"))
    },
    //que nombre tendra el archivo que guardamos
    filename: function(req,file,cb){
        cb(null,`${req.user.email}-documento-${file.originalname}`)
    }
});
//creamos el uploader de multer
export const uploaderDocument = multer({storage:documentStorage});


//configuracion para guardar imagenes de productos
const productStorage = multer.diskStorage({
    //donde voy a guardar los archivos
    destination: function(req,file,cb){
        cb(null,path.join(__dirname,"/multer/products/images"))
    },
    //que nombre tendra el archivo que guardamos
    filename: function(req,file,cb){
        cb(null,`${req.body.code}-imagen-${file.originalname}`)
    }
});
//creamos el uploader de multer
export const uploaderProduct = multer({storage:productStorage});

const product = generateProducts();
console.log(product);


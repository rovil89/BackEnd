import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
import {faker, Faker, es, en} from "@faker-js/faker";

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

const product = generateProducts();
console.log(product);


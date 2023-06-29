import __dirname from "../utils.js";
import swaggerJsdoc from "swagger-jsdoc";
import path from "path";

const PORT = 8080;

const swaggerOptions = {
    definition: {
        openapi:"3.0.1",
        info:{
            title:"Documentacion de Somos Pacifica",
            description:"Api rest para gestionar la compra de las mejores pizzas de Zona Norte",
            version:"1.0.0" 
        },
        servers:[{url:`http://localhost:${PORT}`}], 
    },
    apis:[`${path.join(__dirname,"./docs/**/*.yaml")}`], 
};

export const swaggerSpecs = swaggerJsdoc(swaggerOptions);
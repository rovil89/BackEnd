import { productsModel } from "../../models/products.model.js";

export class ProductsMongo {
    constructor () {
        this.model = productsModel;
    };

    async get(){
        try {
            return this.model.find(); //para obtener todos los productos
        } catch (error) {
            console.log(error.message);
            throw new Error ("Hubo un error al obtener los productos") 
        }
    };

    async post(products){
        try {
            const productCreated = await this.model.create(products);
            return productCreated;
        } catch (error) {
            console.log(error.message);
            throw new Error ("Hubo un error al crear el producto") 
        }
    };

    async getProductById (id){ //PARA BUSCAR UN PRODUCTO POR EL ID
        try {
            const product = await this.model.findById(id);
            if(!product){
                throw new Error ("No se encontro el producto") 
            }
            return product;
        } catch (error) {
            console.log(error.message);
            throw new Error ("Hubo un error al buscar el producto") 
        }
    };
}
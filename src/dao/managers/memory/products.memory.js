import { v4 as uuidv4} from "uuid";

export class ProductsMemory {
    constructor () {
        this.product = [
            {
                title: "Barrio Fino",
                description: "La Pizza del Big Boss",
                price: 2500,
                stock: 130
            }
        ];
    };

    get() {
        return this.products;
    };

    post(products) {
        product.id =  uuidv4();
        this.product.push(products);
        return products;
    };

    async getById(id) {
        const product = this.products.find(p => p.id === id);
        if(!product) {
            throw new Error ("No se encontro al producto")
        }
        return products;
    };
}
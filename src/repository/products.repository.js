import {CreateProductsDto, GetProductsDto} from "../dao/dto/product.dto.js";

export class ProductsRepository {
    constructor(dao) {
        this.dao = dao;
    };

    async getProducts(){
    const products = await this.dao.get();
    return products;
    };

    async createProduct(products){
        const productsDto = new CreateProductsDto(products); 
        const productCreated = await this.dao.post(productsDto);
        return productCreated;
    };

    async getProduct(id){
        const product = await this.dao.getProductById(id);
        const result = new GetProductsDto(product);
        return result;
    };
}
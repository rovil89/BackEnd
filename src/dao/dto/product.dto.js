export class CreateProductsDto {
    constructor(product){
        this.title = product.title;
        this.description = product.description;
        this.productComplete = `${product.title} ${product.price}`;
        this.price = product.price;
        this.stock = product.stock;
    }
};

export class GetProductsDto{
    constructor(productsDB) {
        this.productComplete = productsDB.productComplete;
        this.stock = productsDB.stock;
    }
};
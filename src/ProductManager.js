const fs = require ("fs");


class ProductManager{
    #path= "./Products.json";
    #accumulator = 0;
    constructor() {
        this.products = [];
    }

async addProducts (title, description, price, thumbnail, code,  stock) {
    const newProduct = {
        title,
        description,
        price,
        thumbnail,
        code: this.#accumulator,
        stock,
    }
    const products = await this.getProducts();
    const updatedProducts = [...products, newProduct];
    await fs.promises.writeFile(this.#path, JSON.stringify(updatedProducts));

    this.#accumulator++;

    if(!title || !code || !description) {
        throw new Error ("Not Found / No encontrado");
    }

    const productWithSameCodeExists = this.products.some(
        (p) =>p.code === code);

        if(productWithSameCodeExists){
            throw new Error ("This product already exists / Este producto ya existe");
        }

}

async getProducts() {
    try {
        const products =  await fs.promises.readFile(this.#path, "utf-8");

        return JSON.parse(products)
    } catch (e) {
        return [];
    }
}
async getProductById(code) {
    await this.readFs();
    const chkProductId = await this.products.find((prod) => prod.code === code);

    if (!chkProductId) {
    console.log(await `El ID ${code} NO pertenece en la lista de productos`);
    return null
    } else {
    console.log(await `El ID ${code} Existe en la lista de productos!!!`);
    const infoProduct = await this.products.find((prod) => {
        if (prod.code === code) {
        return {
            ...prod,
        };
        }
    });
    console.log(await infoProduct);
    }
}
async deleteProducts(code){
    const products = await this.getProducts();

    const updatedProducts = products.filter((p) => {
        return p.code !== code;
    });

    await fs.promises.writeFile(this.#path, JSON.stringify(updatedProducts))
    console.log("Producto eliminado con exito");
}


};

async function main(){
const manager = new ProductManager();


await manager.addProducts("Barrio Fino", "La pizza del Big Boss", 1200, "Sin Imagen", 3000, 300);
console.log(await manager.getProducts());

await manager.addProducts("Culebrita", "La pizza de la brita", 1200, "Sin Imagen", 150 ,  150);
console.log(await manager.getProducts());

await manager.addProducts("Doble Muzza", "Con Muzza y medio", 1500, "Sin Imagen", 5000, 335);
console.log(await manager.getProducts());

await manager.deleteProducts();
console.log(await manager.getProducts());

}
main();

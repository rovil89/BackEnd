import express, {json} from "express";
import ProductManager from "./manager/ProductManager.js";
import productsRouter from "./routes/products.router.js";
import CartManager from "./manager/CartManager.js";
import cartsRouter from "./routes/carts.router.js";
import __dirname from "./utils.js";


const app = express();
app.use(json());

app.use(express.static(__dirname + "/../public"));
const manager = new ProductManager(__dirname + "./Products.json");
const cartManager = new CartManager("./Carts.json");


app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);


app.listen(8080, () => {
    console.log("Server listening on port 8080");
});

export { manager, cartManager }
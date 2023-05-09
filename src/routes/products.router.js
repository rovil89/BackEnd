import { Router, json } from "express";
import { ProductsManager } from "../dao/index.js";
import { getProductController, getProductsController, createProductController, updateProductController, deleteProductController} from "../controllers/products.controller.js";


let products = [];

const productsRouter  = Router ();
productsRouter.use(json());
const productsManager = new ProductsManager();

productsRouter.get("/", getProductController);
productsRouter.get("/:pid", getProductsController);
productsRouter.post("/", createProductController);
productsRouter.put("/products/:pid", updateProductController);
productsRouter.delete("/:pid", deleteProductController);

export default productsRouter;
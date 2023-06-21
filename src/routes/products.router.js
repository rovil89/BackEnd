import { Router, json } from "express";
import { ProductsManager } from "../dao/index.js";
import {mockController, getProductController, getProductIdController, createProductController, updateProductController, deleteProductController} from "../controllers/products.controller.js";
import {checkRole} from "../middlewares/auth.js";


let products = [];

const productsRouter  = Router ();
productsRouter.use(json());
const productsManager = new ProductsManager();

productsRouter.get("/mockingproducts", mockController);
productsRouter.get("/", getProductController);
productsRouter.get("/:pid", getProductIdController);
productsRouter.post("/", checkRole(["admin", "premium"]), createProductController);
productsRouter.put("/products/:pid",checkRole(["admin"]), updateProductController);
productsRouter.delete("/:pid",checkRole(["admin", "premium"]) , deleteProductController);




export default productsRouter;
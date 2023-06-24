import { Router, json } from "express";
import {mockController, getProductController, getProductIdController, createProductController, updateProductController, deleteProductController} from "../controllers/products.controller.js";
import {checkRole} from "../middlewares/auth.js";

const productsRouter  = Router ();

productsRouter.get("/mockingproducts", mockController);
productsRouter.get("/", getProductController);
productsRouter.get("/:pid", getProductIdController);
productsRouter.post("/", checkRole(["admin", "premium"]), createProductController);
productsRouter.put("/products/:pid",checkRole(["admin"]), updateProductController);
productsRouter.delete("/:pid",checkRole(["admin", "premium"]) , deleteProductController);


export default productsRouter;
import {json, Router} from "express";
import { manager } from "../app.js";
import ProductsManager from "../dao/file-managers/products.manager.js"
import CartsManager from "../dao/file-managers/carts.manager.js";
import MessageManager from "../dao/db-managers/messages.manager.js";
import productsModel from "../dao/models/products.model.js";
import {cartModel} from "../dao/models/carts.model.js";
import { UserModel } from "../dao/models/user.model.js";
import passport from "passport";
import { UserManagerMongo } from "../dao/db-managers/userManagerMongo.js";
import { viewsController, LoginViewsController, SignupViewsController, ProfileViewsController, ProductPassportController, ProductController, messageController, cartController, RealTimeProductController } from "../controllers/views.controller.js";



const productsManager = new ProductsManager();
const cartsManager = new CartsManager();
const messageManager = new MessageManager();
const userManager = new UserManagerMongo(UserModel);

const router = Router();
router.use(json());

// Rutas de vistas
router.get("/", viewsController );
router.get("/login", LoginViewsController);
router.get("/signup", SignupViewsController);
router.get("/profile", ProfileViewsController);
router.get("/products",ProductPassportController , ProductController);
router.get("/message", messageController);

// router.get("/products", async(req, res) => {
//     const products = await productsManager.getAll();

//     res.render("products", {products});
// });

router.get("/carts", cartController);
router.get("/real-time-products", RealTimeProductController);

export default router;
import {json, Router} from "express";
import { manager } from "../app.js";
import ProductsManager from "../dao/file-managers/products.manager.js"
import CartsManager from "../dao/file-managers/carts.manager.js";
import MessageManager from "../dao/db-managers/messages.manager.js";
import productsModel from "../dao/models/products.model.js";
import cartModel from "../dao/models/carts.model.js";
import { UserModel } from "../dao/models/user.model.js";


const productsManager = new ProductsManager();
const cartsManager = new CartsManager();
const messageManager = new MessageManager();
const router = Router();
router.use(json());

router.get("/products", async (req, res) => {
    const {page} = req.query;
    //codigo para renderizar products
    const products = await productsModel.paginate(
        {},
        {
            limit: 5,
            lean: true, 
            page: page ?? 1 //se le puede agregar para ver la pag 2
        }
    );
    const user = req.session.user;
    const userDB = await UserModel.findOne({email:user}).lean(); 
    console.log(userDB); 
    res.render("products", { products, userDB } );

});



router.get("/message", async(req, res) => {
    const message = await messageManager.getAll();

    res.render("messages", {messagesPanel});
});

// router.get("/products", async(req, res) => {
//     const products = await productsManager.getAll();

//     res.render("products", {products});
// });

router.get("/carts", async(req, res) => {
    const carts = await cartModel.paginate(
        {},
        {
            limit: 5,
        }
    );

    res.send(carts);
    });


router.get("/home", async (req, res) => {
    const products = await manager.getProducts()
    res.render("home", {products})
});

router.get("/real-time-products", async (req,res)=>{
    const products = await manager.getProducts()
    res.render("real-time-products", {products})
});



export default router;
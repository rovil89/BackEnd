import { CartsManager } from "../dao/index.js";
import {ticketsModel} from "../dao/models/tickets.model.js";
import {cartModel} from "../dao/models/carts.model.js";
import {productsModel} from "../dao/models/products.model.js";
import {v4 as uuidv4} from "uuid";
import {CustomError} from "../services/curstomError.service.js";
import {Errors} from "../enums/Errors.js";

const cartManager = new CartsManager();

export const CartController = async (req, res) => {
    const carts = await cartManager.getAll();
    res.send(carts);
};

export const PostCartController = async (req, res) => {

    try {
        const cartCreated = await cartModel.create({});
        res.send(cartCreated)
    } catch (error) {
        res.send(error.message)
    }
    // const {title, description, vendedor } = req.body;
    // // validacion
    // if(!title || !description || !vendedor ) {
    //     return res
    //         .status(400)
    //         .send({ status: "error", payload: "Missing parameters" });
    // }

    // const result = await cartManager.create({
    //     title,
    //     description,
    //     vendedor,
    //     products: [],
    // });

    // res.status(201).send({ status: "ok", payload: result});
};

export const CartProductController = async (req, res) => {
    const { cartId, productId } = req.params;

    const result = await cartManager.addProduct(cartId, productId);

    res.send({ status: "ok", payload: result});
};

export const CartIdController = async (req, res) => {
    const {cid} = req.params;

    const cart = await cartModel.findById(cid);

    res.send(cart)

};

export const PurchaseController = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const cart = await cartModel.findById(cartId);
        if(cart) {
            if (!cart.products.length){
                return res.send("Es necesario que agregue productos antes de realizar la compra")
            } 

            const ticketProducts = []; //prod que si puede comprar xq hay stock
            const rejectedProducts = []; //prod que no se pueden comprar xq no hay stock
            
            console.log("cart", cart);
            
            //verificamos q haya productos en el carrito
            for(let i=0; i<cart.products.length;i++) { //validar q esos prod esten en el inventario 
                const cartProduct = cart.products[i];
                const productDB = await productsModel.findById(cartProduct.productId); //me muestra los prod con sus titulo, stock, etc
                console.log("productDB",productDB)}//me muestra los prod con sus titulo, stock, etc
            
                //comparar la cant de prod del carrito con el stick del producto
                if(cartProduct.quantity<=productDB.stock){
                ticketProducts.push(cartProduct);
                } else {
                    rejectedProducts.push(cartProduct);
                }
            console.log("ticketProducts", ticketProducts);
            console.log("rejectedProducts", rejectedProducts);

            const newTicket = {
                 code: uuidv4(), //para el codigo del ticket
                 purchase_datetime: new Date().toLocaleString(), //para que la fecha sea mas legible
                amount: 500,
                purchaser:req.user.email
            }
            const ticketCreated = await ticketsModel.create(newTicket);
            res.send(ticketCreated)

        }
        else {
            res.send("El carrito no existe")
        }
    } catch (error) {
        res.send(error.message)}
};


export const DeleteCartController = async (req, res) => {
    const { cartId } = req.params;

    const result = await cartManager.deleteProducts(cartId);

    res.send({ status: "ok", payload: result});
};

export const DeleteProductController = async (req, res) =>{
    const { cartId, productId } = req.params;

    const result = await cartModel.deleteProduct(cartId, productId);

    res.send({ status: "ok", payload: result});
};


export const PutCartController = async (req, res) =>{
    try {
        const {cartId, productId, quantity} = req.body; 
        const cart = await cartModel.findById(cartId); 
        cart.products.push({id: productId, quantity: quantity}); //para agregar los prod al carrito
        cart.save(); //actualiza el carrito
        res.send("Producto agregado")
    } catch (error) {
        re.send(error.message)
    }
};

export const PutProductController = async (req, res) =>{
    const { cartId, productId } = req.body;

    const result = await cartManager.updatedProduct(cartId, productId);

    res.send({ status: "ok", payload: result});
};
import {cartModel} from "../models/carts.model.js";

export default class CartsManager{
    constructor(){
        // console.log("Working with carts using database");
    }

    
    getAll = async () => {
        const carts = await cartModel.find().lean();

        return carts;
    };

    create = async (cart) => {
        const result = await cartModel.create(cart);

        return result;
    };

        // carrito (esto retorna un objeto de mongoose)
    addProduct = async (cartId, productId) => {
        const cart = await cartModel.findById(cartId);
        const cartProduct = {
            product: productId, 
            quantity: 1,
        };
        cart.products.push({ cartProduct });
        return cart.save();
    };

    updatedProduct = async (cartId, productId) => {
        const updatedCart = await cart.findByIdAndUpdate(
            cartId,
            { $set: { "products.$[product].quantity": quantity } },
            
            { new: true, arrayFilters: [{ "product._id": productId }] }
            ); return updatedCart };

    deleteProducts = async (cartId) => {
        const cart = await cartModel.findById(cartId);

        cart.products.remove({ cartId});
        return cart.save();
    };
    
};



import {UserRepository} from "./users.repository.js";
import {ProductsRepository} from "./products.repository.js";
import {authDao, productsDao} from "../dao/factory.js";


export const userService = new UserRepository(authDao);
export const productService = new ProductsRepository(productsDao);
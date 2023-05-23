import {UserRepository} from "./users.repository.js";
import {authDao} from "../dao/factory.js";

export const userService = new UserRepository(authDao);
import express, { urlencoded } from "express";
import ProductManager from "./manager/ProductManager.js";
import productsRouter from "./routes/products.router.js";
import CartManager from "./manager/CartManager.js";
import cartsRouter from "./routes/carts.router.js";
import { engine }  from "express-handlebars"
import viewsRouter from "./routes/views.router.js";
import { Server } from "socket.io";
import mongoose from "mongoose";
import productsModel from "./dao/models/products.model.js";
import {cartModel} from "./dao/models/carts.model.js";
import MongoStore from "connect-mongo";
import handlebars from "express-handlebars";
import path from "path";
import session from "express-session";
import passport from "passport";
import __dirname from "./utils.js";
import {AuthRouter} from "./routes/auth.router.js";
import {WebRouter} from "./routes/web.router.js";
import {initializePassport} from "./config/passport.config.js";
import cookieParser from "cookie-parser";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"/public")));
app.use(cookieParser());

const messages = [];
const database = "mongodb+srv://rodrigovildoza:revp3242@rodrivp.xpq0vwj.mongodb.net/desafio?retryWrites=true&w=majority"

// configuracion de session
app.use(session({
    store: MongoStore.create({
        mongoUrl: database,
        ttl:60
    }),
    secret: "claveSecreta",
    resave: true,
    saveUninitialized: true
}));

const manager = new ProductManager(__dirname + "/Products.json");
const cartManager = new CartManager(__dirname + "/Carts.json");

app.use(express.static(__dirname + "/../public"));

// configurar PASSPORT
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// Handlebars
app.engine('.hbs', handlebars.engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, "/views"));



// Router
app.use(WebRouter);
app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/sessions", AuthRouter);



// Mongoose
const main = async () => { 
await mongoose
    .connect(database)
    .then((conn) => {
        console.log("Conected to MongoDB!!");
});

const products = await productsModel.aggregate([
    { $group: { _id: "$title", Precio: { $sum: "$price"} }  },
    { $sort: {Precio: -1} },
    { $group: { _id: 1, products: { $push: "$$ROOT"} } },
    {
        $project: {
            _id: 0,
            Pizzas: "$products",
        },
    },
    { $merge: { into: "reports" } },
]);
// console.log(products);


const cart = await cartModel.findById("6420aed66e7b33491341d6b6")
// console.log(JSON.stringify(cart, null, "\t"));


};

main();

const httpServer = app.listen(8080, () => {
    console.log("Server listening on port 8080");
});

const io = new Server(httpServer);

io.on("connection", (socket) => {
    socket.on("chat-message", (data) => {
        messages.push(data);

        io.emit("messages", messages);
        // recibe todos ls msjs actualizados a todos los clientes.
    })


console.log("Nuevo cliente conectado!");
// mensaje en terminal
    
socket.emit("messege", "Mensage de parte de Somos Pacifica!!!");
// mensaje en consola

socket.on("messege", (data) =>{
        console.log(data);});

app.use((req,res,next)=>{
    req.io = io
    next()
});

        
});

export { manager, cartManager }
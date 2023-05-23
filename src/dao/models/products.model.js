import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsCollection = "products";

const productsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    carts: {
        type: [{
            cart: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "carts", //nombre de la collection que el type hace referencia
            }
        },
    ],
    default: [],
    },
});

productsSchema.pre("findOne", function() {
    this.populate("carts.cart");
    // this es el findById del index.js
});

productsSchema.plugin(mongoosePaginate);

export const productsModel = mongoose.model(productsCollection, productsSchema);
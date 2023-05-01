import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";


const cartsSchema = new mongoose.Schema({
    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products",
                },
                quantity: {
                    type: Number,
                    required: true,
                    default: 1,
                },
            },
        ],
        required: true,
        default: [],
    },
});

cartsSchema.pre("findOne", function() {
    this.populate("products.product");
    // this es el findById del index.js
});

cartsSchema.plugin(mongoosePaginate)

export const cartModel = mongoose.model("carts", cartsSchema);
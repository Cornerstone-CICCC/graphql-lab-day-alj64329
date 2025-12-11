import mongoose, {Schema} from "mongoose";

const ProductSchema = new Schema({
    productName:{type:String, required: true},
    productPrice:{type:Number, required: true}
})

export const Product = mongoose.model("Product", ProductSchema)
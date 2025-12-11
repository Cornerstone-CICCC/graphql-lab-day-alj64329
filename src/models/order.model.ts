import mongoose, {Schema, Document} from "mongoose";

export interface IOrder{
    productId: mongoose.Types.ObjectId,
    customerId: mongoose.Types.ObjectId,
}

export interface IOrderDocument extends IOrder, Document {}

const OrderSchema :Schema = new Schema({
    productId:{type:mongoose.Schema.Types.ObjectId, required:true, ref:"Product"},
    customerId:{type:mongoose.Schema.Types.ObjectId, required:true, ref:"Customer"}
},{timestamps:true})

export const Order = mongoose.model<IOrderDocument>('Order',OrderSchema)
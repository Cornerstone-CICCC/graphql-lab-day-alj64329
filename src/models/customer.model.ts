import mongoose, {Schema} from "mongoose";

export interface ICustomer {
    id:string,
    firstName:string,
    lastName:string,
    email:string
}

const CustomerSchema = new Schema({
    firstName:{type:String, requred:true},
    lastName:{type:String, required:true},
    email:{type:String, required:true}
})

export const Customer = mongoose.model("Customer", CustomerSchema)
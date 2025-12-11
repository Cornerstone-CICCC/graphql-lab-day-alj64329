import { Product } from "../models/product.model"
import { IProduct } from "../types/product"

const getProducts = async()=>{
    const products = await Product.find()

    return products
}

const createProduct = async(data:Omit<IProduct,'id'>)=>{
    const product = new Product(data)

    return await product.save()
}


const getProductById = async (id:string)=>{
    return await Product.findById(id)
}

const updateProduct = async (id: string, data: Partial<IProduct>) => {
  return await Product.findByIdAndUpdate(id, data, { new: true })
}

const deleteProduct = async (id: string) => {
  return await Product.findByIdAndDelete(id)
}

export default{
    getProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct
}
import customerController from "../controllers/customer.controller";
import orderController from "../controllers/order.controller";
import productController from "../controllers/product.controller";
import { ICustomer } from "../models/customer.model";
import { IOrder, IOrderDocument } from "../models/order.model";
import { IProduct } from "../types/product";

// Finish the resolvers
export const resolvers = {
  Query: {
    products: async() => await productController.getProducts(),
    customers: async() => await customerController.getCustomers(),
    orders: async() => await orderController.getOrders(),
    getProductById: async(_:unknown, {id}:{id:string}) => await productController.getProductById(id),
    getCustomerById:async(_:unknown, {id}:{id:string}) => await customerController.getCustomerById(id),
  },
  Product: {
    customers: async(parent:{id:string}) => {
      const orders = await orderController.getOrders()
      const customer = await customerController.getCustomers()

      const productOrders = orders.filter(o=> o.productId.toString() === parent.id)
      return productOrders.flatMap(o=>customer.filter(c => o.customerId.toString()=== c.id))
    }
  },
  Customer: {
    products: async(parent:{id:string}) => {
      const orders = await orderController.getOrders()
      const products = await productController.getProducts()

      const customerOrders = orders.filter(o=> o.customerId.toString() === parent.id)
      return customerOrders.flatMap(o=>products.filter(p=>o.productId.toString()===p.id))
    }
  },
  Order: {
    customer: async(parent:{customerId:string})=>{
      const customers = await customerController.getCustomers()
      return customers.find(c => c.id.toString() === parent.customerId.toString())
    },
    product: async(parent:{productId:string}) => {
      const products = await productController.getProducts()
      return products.find(p=>parent.productId.toString()===p.id.toString())
    }
  },
  Mutation: {
    addProduct:async (_: unknown, { productName, productPrice }: Omit<IProduct, 'id'>) =>
      await productController.createProduct({ productName, productPrice }),
    editProduct: async(_:unknown,{id, productName, productPrice}:IProduct)=>
      await productController.updateProduct(id,{productName, productPrice}),
    removeProduct: async(_:unknown,{id}:{id:string})=>
      await productController.deleteProduct(id),

    addCustomer: async (_: unknown, { firstName, lastName, email }: Omit<ICustomer, 'id'>) =>
      await customerController.createCustomer({ firstName, lastName, email }),
    editCustomer: async (_: unknown, { id, firstName, lastName, email }:ICustomer) =>
      await customerController.updateCustomer(id, {firstName, lastName, email}),
    removeCustomer: async(__:unknown, {id}:{id:string})=>
      await customerController.deleteCustomer(id),

    addOrder: async(_:unknown, {productId, customerId}:Omit<IOrder,'id'>) => 
      await orderController.createOrder({productId, customerId}),
    editOrder: async(_: unknown, { id, productId, customerId }:IOrderDocument) => 
      await orderController.updateOrder(id, {productId, customerId}),
    removeOrder: async(_:unknown, {id}:{id:string})=>
      await orderController.deleteOrder(id)
  }
}

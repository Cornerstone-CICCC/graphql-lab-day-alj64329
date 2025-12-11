import { Customer, ICustomer } from "../models/customer.model"

const getCustomers = async()=>{
    const customers = await Customer.find()

    return customers
}

const createCustomer = async(data:Omit<ICustomer,'id'>)=>{
    const customer = new Customer(data)

    return await customer.save()
}


const getCustomerById = async (id:string)=>{
    return await Customer.findById(id)
}

const updateCustomer = async (id: string, data: Partial<ICustomer>) => {
  return await Customer.findByIdAndUpdate(id, data, { new: true })
}

const deleteCustomer = async (id: string) => {
  return await Customer.findByIdAndDelete(id)
}

export default{
    getCustomers,
    createCustomer,
    getCustomerById,
    updateCustomer,
    deleteCustomer
}
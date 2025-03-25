import Customer from "../models/customer.js";

const CustomerController = {
  add(data) {
    const newCustomer = new Customer(data);
    return newCustomer.save();
  },
  deleteById(objectId) {
    return Customer.findByIdAndDelete(objectId).exec();
  },
  getById(objectId) {
    return Customer.findById(objectId).exec();
  },
  get(filters) {
    return Customer.find(filters).exec();
  },
};

export default CustomerController;

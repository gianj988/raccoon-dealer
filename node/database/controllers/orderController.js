import Order from "../models/order.js";

const OrderController = {
  add(data) {
    const newOrder = new Order(data);
    return newOrder.save();
  },
  updateById(id, data) {
    return Order.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  },
  deleteById(objectId) {
    return Order.findByIdAndDelete(objectId).exec();
  },
  getById(objectId) {
    return Order.findById(objectId).exec();
  },
  get(filters) {
    return Order.find(filters).exec();
  },
};

export default OrderController;

import OrderStatus from "../models/order_status.js";

const OrderStatusController = {
  add(data) {
    const newOrderStatus = new OrderStatus(data);
    return newOrderStatus.save();
  },
  deleteById(objectId) {
    return OrderStatus.findByIdAndDelete(objectId).exec();
  },
  getById(objectId) {
    return OrderStatus.findById(objectId).exec();
  },
  get(filters) {
    return OrderStatus.find(filters).exec();
  },
};

export default OrderStatusController;

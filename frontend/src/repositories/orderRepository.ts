import { OrderAdapter } from "../adapters/orderAdapter";
import { Product } from "../types";

const OrderRepository = {
  getCustomerOrders: async function (customerId: string) {
    console.error("getCustomerOrders", customerId);
    if (!customerId) {
      return [];
    }
    return await OrderAdapter.get(`/customers/${customerId}/orders`);
  },
  createOrder: async function (customerId: string, products: Array<Product>) {
    let totalAmount = 0;
    for (const p of products) {
      totalAmount += p.unitPrice;
    }
    return await OrderAdapter.post("/orders", {
      customer: customerId,
      products: products,
      totalAmount: totalAmount,
      status: 1,
      orderDate: new Date().toISOString(),
    });
  },
  confirmOrder: async function (orderId: string) {
    return await OrderAdapter.patch(`/orders/${orderId}`, {
      status: 2,
    });
  },
};

export { OrderRepository };

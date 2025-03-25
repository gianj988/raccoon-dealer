import { ProductsAdapter } from "../adapters/productsAdapter";

const ProductsRepository = {
  getProducts: async function (page: number) {
    return await ProductsAdapter.get("/products", { params: { page: page } });
  },
  getProductInfo: async function (productId: string) {
    return await ProductsAdapter.get(`/products/${productId}`);
  },
};

export { ProductsRepository };

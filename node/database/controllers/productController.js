import Product from "../models/product.js";

const ProductController = {
  add(data) {
    const newProduct = new Product(data);
    return newProduct.save();
  },
  count(filters) {
    return Product.countDocuments(filters || {}).exec();
  },
  deleteById(objectId) {
    return Product.findByIdAndDelete(objectId).exec();
  },
  getById(objectId) {
    return Product.findById(objectId).exec();
  },
  get(filters) {
    return Product.find(filters).exec();
  },
  getPaged(filters, page) {
    if (!page) {
      page = 1;
    }
    const limit = 12;
    const offset = limit * (page - 1);
    return Product.find(filters).skip(offset).limit(limit).exec();
  },
};

export default ProductController;

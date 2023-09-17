const Product = require("../models/product");

const ITEMS_PER_PAGE = 10;

class ProductController {
  static async create(request, response) {
    const data = request.body;
    const images = request.files?.map((file) => {
      const b64 = file.buffer.toString("base64");
      return `data:${file.mimetype};base64,${b64}`;
    });

    const product = await Product.create({
      ...data,
      images,
    });

    return response.status(201).json(product);
  }

  static async list(request, response) {
    const { page = 1, limit } = request.query;
    const itemsPerPage = limit ? Number(limit) : ITEMS_PER_PAGE;

    const products = await Product.find()
      .skip((page - 1) * itemsPerPage)
      .limit(itemsPerPage);

    return response.json(products);
  }

  static async detail(request, response) {
    const { id } = request.params;

    const product = await Product.findById(id);

    return response.status(product ? 200 : 404).json(product);
  }

  static async update(request, response) {
    const { id } = request.params;
    const data = request.body;

    const product = Product.findById(id);

    if (!product) {
      return response.status(404).json({ message: "Product not found" });
    }

    const images = request.files?.map((file) => {
      const b64 = file.buffer.toString("base64");
      return `data:${file.mimetype};base64,${b64}`;
    });

    const updatedProduct = await product.set(id, {
      ...data,
      images,
    });

    return response.json(updatedProduct);
  }

  static async delete(request, response) {
    const { id } = request.params;

    const product = await Product.findById(id);

    if (!product) {
      return response.status(404).json({ message: "Product not found" });
    }

    await product.delete();

    return response.json({ message: "Product deleted" });
  }
}

module.exports = ProductController;

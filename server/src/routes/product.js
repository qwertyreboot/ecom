const express = require("express");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const ProductController = require("../controllers/product");
const { isStaff } = require("../middlewares/auth");

const productRouter = express.Router();

productRouter.post(
  "/",
  isStaff,
  upload.array("images"),
  ProductController.create
);
productRouter.get("/", ProductController.list);
productRouter.get("/:id", ProductController.detail);
productRouter.patch(
  "/:id",
  isStaff,
  upload.array("images"),
  ProductController.update
);
productRouter.delete("/:id", isStaff, ProductController.delete);

module.exports = productRouter;

const express = require("express");

const OrderController = require("../controllers/order");
const { isAuthenticated } = require("../middlewares/auth");

const orderRouter = express.Router();

orderRouter.post("/", isAuthenticated, OrderController.create);
orderRouter.get("/", isAuthenticated, OrderController.list);
orderRouter.get("/:id", isAuthenticated, OrderController.detail);
orderRouter.delete("/:id", isAuthenticated, OrderController.cancel);

module.exports = orderRouter;

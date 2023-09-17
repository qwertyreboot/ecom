const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRouter = require("./routes/auth");
const productRouter = require("./routes/product");
const orderRouter = require("./routes/order");
const getUser = require("./middlewares/getUser");
const { PORT, MONGO_URL } = require("./config");

mongoose.connect(MONGO_URL);

const server = express();
server.use(express.json());
server.use(cors());
server.use(getUser);

server.use((request, response, next) => {
  console.info(`${request.method} ${request.originalUrl}`);
  next();
});

server.get("/", (request, response) => {
  response.json({ message: "Hello World" });
});

server.use("/auth", authRouter);
server.use("/products", productRouter);
server.use("/orders", orderRouter);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

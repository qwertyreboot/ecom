const express = require("express");

const AuthController = require("../controllers/auth");

const authRouter = express.Router();

authRouter.post("/signup", AuthController.signup);
authRouter.post(["/login", "/signin"], AuthController.signin);

module.exports = authRouter;

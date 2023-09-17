const jwt = require("jsonwebtoken");
const Users = require("../models/user");
const { JWT_SECRET } = require("../config");

async function getUser(request, response, next) {
  const { authorization } = request.headers;

  if (!authorization) {
    request.user = null;
    return next();
  }

  const token = authorization.replace("Bearer", "").trim();

  try {
    const data = jwt.verify(token, JWT_SECRET);
    const user = await Users.findById(data);
    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }

    request.user = user;
    return next();
  } catch (error) {
    return response.status(403).json({ message: "Invalid token" });
  }
}

module.exports = getUser;

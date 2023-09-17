const jwt = require("jsonwebtoken");
const Users = require("../models/user");
const { JWT_SECRET, BCRYPT_HASH_SALT } = require("../config");
const bcrypt = require("bcrypt");

class AuthController {
  static async signup(request, response) {
    const data = request.body;
    const password = bcrypt.hashSync(data.password, BCRYPT_HASH_SALT);

    const user = await Users.create({ ...data, password });

    const token = jwt.sign(user._id.toString(), JWT_SECRET);

    response.json({ user: { ...user._doc, password: undefined }, token });
  }

  static async signin(request, response) {
    const { email, password } = request.body;

    const user = await Users.findOne({ email });

    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return response.status(403).json({ message: "Password does not match" });
    }

    const token = jwt.sign(user._id.toString(), JWT_SECRET);

    response.json({ user: { ...user._doc, password: undefined }, token });
  }
}

module.exports = AuthController;

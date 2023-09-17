require("dotenv").config();

const PORT = Number(process.env.PORT) ?? 4000;
const JWT_SECRET = process.env.JWT_SECRET;
const BCRYPT_HASH_SALT = Number(process.env.BCRYPT_HASH_SALT) ?? 10;
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const CLIENT_URL = process.env.CLIENT_URL;

module.exports = {
  JWT_SECRET,
  PORT,
  BCRYPT_HASH_SALT,
  STRIPE_SECRET_KEY,
  CLIENT_URL,
};

require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3000,
  db: {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "artesmarciales",
    password: process.env.DB_PASSWORD || "artesmarciales",
    name: process.env.DB_NAME || "Artes_Marciales",
    port: process.env.DB_PORT || 3306,
  },
  secretKey: process.env.SECRET_KEY || "default_secret",
};

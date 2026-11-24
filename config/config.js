require("dotenv").config();

const config = {
  username: process.env.DB_USER || process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASS || process.env.DB_PASSWORD || "",
  database: process.env.DB_DATABASE || process.env.DB_NAME || "perpustakaan",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  dialect: process.env.DB_DIALECT || "postgres",
};

module.exports = {
  development: config,
  test: config,
  production: config,
};

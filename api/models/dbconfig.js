const dotenv = require("dotenv");
dotenv.config();

const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  server: process.env.DB_SERVER,
  port: parseInt(process.env.DB_PORT, 10),
  options: {
    encrypt: false,
    trustedConnection: false,
    connectTimeout: 15000,
  },
};

module.exports = sqlConfig;

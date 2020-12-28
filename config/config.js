const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  development: {
    username: "root",
    password: process.env.DATABASE_PASSWORD,
    database: "cardbook",
    host: "127.0.0.1",
    dialect: "mysql",
    logging: false,
    timezone:"+9:00"
  },
  test: {
    username: "root",
    password: process.env.DATABASE_PASSWORD,
    database: "",
    host: "127.0.0.1",
    dialect: "mysql",
    logging: false
  },
  production: {
    username: "root",
    password: process.env.DATABASE_PASSWORD,
    database: "",
    host: "127.0.0.1",
    dialect: "mysql",
    logging: false
  }
}


require('dotenv').config()

module.exports = {
  "development": {
    "username": process.env.POSTGRES_USERNAME,
    "password": process.env.POSTGRES_PASSWORD,
    "database": process.env.POSTGRES_NAME,
    "host": process.env.POSTGRES_HOST,
    "dialect": process.env.POSTGRES_DIALECT,
  },
  "test": {
    "dialect": "sqlite",
    "storage": process.env.POSTGRES_STORAGE,
  },
  "production": {
    "username": process.env.POSTGRES_USERNAME,
    "password": process.env.POSTGRES_PASSWORD,
    "database": process.env.POSTGRES_NAME,
    "host": process.env.POSTGRES_HOST,
    "dialect": process.env.POSTGRES_DIALECT,
    "storage": process.env.POSTGRES_STORAGE,
  }
}
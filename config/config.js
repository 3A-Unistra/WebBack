require('dotenv').config()

module.exports = {
  "development": {
    "dialect": "sqlite",
    "storage": process.env.POSTGRES_STORAGE,
  },
  "test": {
    "dialect": "sqlite",
    "storage": process.env.POSTGRES_STORAGE,
  },
  "production": {
    "username": process.env.POSTGRES_USERNAME,
    "password": process.env.POSTGRES_PASSWORD,
    "database": process.env.POSTGRES_NAME,
    "host": process.env.POSTGRES_SERVICE_HOST,
    "port": process.env.POSTGRES_SERVICE_PORT,
    "dialect": process.env.POSTGRES_DIALECT,
    "storage": process.env.POSTGRES_STORAGE,
    "logging": false
  }
}

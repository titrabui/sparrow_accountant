require('dotenv').config()

let MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sparrow_accountant_development_db'
let PORT = process.env.PORT || 4000
let SECRET = process.env.SECRET

if (process.env.NODE_ENV === 'production') {
  MONGODB_URI = process.env.PRODUCTION_MONGODB_URI
} else if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI
}

module.exports = {
  MONGODB_URI,
  PORT,
  SECRET
}

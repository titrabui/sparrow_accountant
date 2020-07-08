const express = require('express')
const app = express()
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const config = require('./utils/config')

mongoose.set('useFindAndModify', false)
mongoose.plugin(uniqueValidator)
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to DB:', error.message)
  })

module.exports = app

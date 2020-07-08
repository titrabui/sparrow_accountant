const jwt = require('jsonwebtoken')
const config = require('./config')
const { User } = require('../models')

const BEARER_LENGTH = 7

const tokenExtractor = async token => {
  if (!token || !token.toLowerCase().startsWith('bearer ')) return null
  const decodedToken = jwt.verify(
    token.substring(BEARER_LENGTH), config.SECRET
  )
  const currentUser = await User.findById(decodedToken.id)
  return currentUser
}

module.exports = {
  tokenExtractor
}

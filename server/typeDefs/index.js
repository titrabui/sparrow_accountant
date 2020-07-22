const query = require('./query')
const mutation = require('./mutation')
const { userType, tokenType, providerType, goodType } = require('./types')

const typeDefs = [
  query,
  mutation,
  userType,
  tokenType,
  providerType,
  goodType
]

module.exports = {
  typeDefs
}

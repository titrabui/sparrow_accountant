const query = require('./query')
const mutation = require('./mutation')
const { userType, tokenType } = require('./types')

const typeDefs = [
  query,
  mutation,
  userType,
  tokenType
]

module.exports = {
  typeDefs
}

const { gql } = require('apollo-server-express')

const tokenType = gql`
  type Token {
    token: String!
  }
`
module.exports = tokenType

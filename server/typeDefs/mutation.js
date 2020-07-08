const { gql } = require('apollo-server-express')

const mutation = gql`
  type Mutation {
    createUser(
      username: String!
      email: String!
      password: String!
      type: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`
module.exports = mutation

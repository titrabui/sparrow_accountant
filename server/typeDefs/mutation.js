const { gql } = require('apollo-server-express')

const mutation = gql`
  type Success {
    success: Boolean!
  }

  type Mutation {
    createUser(
      username: String!
      email: String!
      password: String!
      name: String!
      avatar: String
      type: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
    createGood(
      goodId: String!
      name: String!
      specification: String!
      unit: String!
      providerId: ID
    ): Good
    updateGood(
      id: ID!
      goodId: String
      name: String
      specification: String
      unit: String
      providerId: ID
    ): Good
    deleteGood(
      id: ID!
    ): Good
    createProvider(
      name: String!
      phone: String
      address: String
    ): Success!
    updateProvider(
      id: ID!
      name: String
      phone: String
      address: String
    ): Success!
    deleteProvider(
      ids: [ID]!
    ): Success!
  }
`
module.exports = mutation

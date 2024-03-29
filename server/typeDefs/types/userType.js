const { gql } = require('apollo-server-express')

const userType = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    status: String
    hashedPassword: String!
    type: String
    name: String!
    avatar: String
  }
`
module.exports = userType

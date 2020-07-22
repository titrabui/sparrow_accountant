const { gql } = require('apollo-server-express')

const providerType = gql`
  type Provider {
    id: ID!
    name: String!
    phone: String
    address: String
  }
`
module.exports = providerType

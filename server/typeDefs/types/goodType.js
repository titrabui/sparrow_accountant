const { gql } = require('apollo-server-express')

const goodType = gql`
  type Good {
    id: ID!
    goodId: String!
    name: String!
    specification: String!
    unit: String!
    provider: Provider
  }
`
module.exports = goodType

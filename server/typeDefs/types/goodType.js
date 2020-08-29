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

  type ReturnedGood {
    data: [Good]!
    total: Int!
    success: Boolean!
    pageSize: Int!
    current: Int!
  }

  input fetchGoodParamsInput {
    current: Int
    pageSize: Int
    goodId: String
    name: String
    specification: String
    unit: String
  }

  input fetchGoodSorterInput {
    goodId: Sorter
    name: Sorter
  }

  input fetchGoodFilterInput {
    name: String
  }
`
module.exports = goodType

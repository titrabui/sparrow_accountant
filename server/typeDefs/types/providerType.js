const { gql } = require('apollo-server-express')

const providerType = gql`
  enum Sorter {
    ascend
    descend
  }

  type Provider {
    id: ID!
    name: String!
    phone: String
    address: String
  }

  type ReturnedProvider {
    data: [Provider]!
    total: Int!
    success: Boolean!
    pageSize: Int!
    current: Int!
  }

  input fetchProviderParamsInput {
    current: Int
    pageSize: Int
    name: String
    phone: String
    address: String
  }

  input fetchProviderSorterInput {
    name: Sorter
  }

  input fetchProviderFilterInput {
    name: String
  }
`
module.exports = providerType

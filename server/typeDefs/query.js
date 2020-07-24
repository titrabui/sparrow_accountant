const { gql } = require('apollo-server-express')

const query = gql`
  type Query {
    me: User
    fetchGoods: [Good]
    fetchProviders(
      params: fetchProviderParamsInput
      sorter: fetchProviderSorterInput
      filter: fetchProviderFilterInput
    ): ReturnedProvider
  }
`
module.exports = query

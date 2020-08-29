const { gql } = require('apollo-server-express')

const query = gql`
  type Query {
    me: User
    fetchGoods(
      params: fetchGoodParamsInput
      sorter: fetchGoodSorterInput
      filter: fetchGoodFilterInput
    ): ReturnedGood
    fetchProviders(
      params: fetchProviderParamsInput
      sorter: fetchProviderSorterInput
      filter: fetchProviderFilterInput
    ): ReturnedProvider
  }
`
module.exports = query

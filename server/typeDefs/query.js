const { gql } = require('apollo-server-express')

const query = gql`
  type Query {
    me: User
    fetchGoods: [Good]
    fetchProviders: [Provider]
  }
`
module.exports = query

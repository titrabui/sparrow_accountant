const { gql } = require('apollo-server-express')

const query = gql`
  type Query {
    me: User
  }
`
module.exports = query

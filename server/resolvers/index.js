const { usersResolvers } = require('./usersResolvers')
const { goodsResolvers } = require('./goodsResolvers')
const { providersResolvers } = require('./providersResolvers')

const resolvers = [
  usersResolvers,
  goodsResolvers,
  providersResolvers
]

module.exports = {
  resolvers
}

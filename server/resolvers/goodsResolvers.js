const { UserInputError } = require('apollo-server-express')
const { combineResolvers } = require('graphql-resolvers')
const { requireAdmin } = require('./authorization')
const { Good, Provider } = require('../models')

const goodsResolvers = {
  Query: {
    fetchGoods: combineResolvers(
      requireAdmin,
      async (_root, _args) => {
        return await Good.find({}).populate('provider')
      }
    )
  },
  Mutation: {
    createGood: combineResolvers(
      requireAdmin,
      async (_root, args) => {
        try {
          let provider = null
          if (args.providerId) {
            provider = await Provider.findById(args.providerId)
          }

          const good = new Good({
            ...args,
            provider
          })

          return await good.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }
    ),
    updateGood: combineResolvers(
      requireAdmin,
      async (_root, args) => {
        try {
          let good = args
          if (args.providerId) {
            const provider = await Provider.findById(args.providerId)
            good = { ...good, provider }
          }

          return await Good.findByIdAndUpdate(args.id, good, { new: true }).populate('provider')
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }
    ),
    deleteGood: combineResolvers(
      requireAdmin,
      async (_root, args) => {
        try {
          return await Good.findByIdAndRemove(args.id)
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }
    )
  }
}

module.exports = {
  goodsResolvers
}

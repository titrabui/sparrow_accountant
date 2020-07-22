const { UserInputError } = require('apollo-server-express')
const { combineResolvers } = require('graphql-resolvers')
const { requireAdmin } = require('./authorization')
const { Provider } = require('../models')

const providersResolvers = {
  Query: {
    fetchProviders: combineResolvers(
      requireAdmin,
      async (_root, _args) => {
        return await Provider.find({})
      }
    )
  },
  Mutation: {
    createProvider: combineResolvers(
      requireAdmin,
      async (_root, args) => {
        try {
          const provider = new Provider(args)
          return await provider.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }
    ),
    updateProvider: combineResolvers(
      requireAdmin,
      async (_root, args) => {
        try {
          return await Provider.findByIdAndUpdate(args.id, args, { new: true })
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }
    ),
    deleteProvider: combineResolvers(
      requireAdmin,
      async (_root, args) => {
        try {
          return await Provider.findByIdAndRemove(args.id)
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
  providersResolvers
}

const { UserInputError } = require('apollo-server-express')
const { combineResolvers } = require('graphql-resolvers')
const { authenticated, canCreateUser } = require('./authorization')
const { User } = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('../utils/config')

const SALT_OR_AROUNDS = 10

const usersResolvers = {
  Query: {
    me: combineResolvers(
      authenticated,
      (_root, _args, context) => {
        return context.currentUser
      }
    )
  },
  Mutation: {
    createUser: combineResolvers(
      canCreateUser,
      async (_root, args) => {
        try {
          const hashedPassword = await bcrypt.hash(args.password, SALT_OR_AROUNDS)
          const user = new User({
            ...args,
            hashedPassword,
            status: 'ACTIVE'
          })

          const createdUser = await user.save()
          return User
            .findById(createdUser._id.toString())
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }
    ),
    login: async (_root, args) => {
      const user = await User.findOne({ username: args.username })
      const passwordIsCorrect = user === null
        ? false
        : await bcrypt.compare(args.password, user.hashedPassword)

      if (!(user && passwordIsCorrect)) {
        throw new UserInputError('invalid username or password')
      }

      const userForToken = user.toJSON()
      return { token: jwt.sign(userForToken, config.SECRET) }
    }
  }
}

module.exports = {
  usersResolvers
}

const { AuthenticationError } = require('apollo-server-express')
const { skip, combineResolvers } = require('graphql-resolvers')

const authenticated = (_root, _args, { currentUser }) => {
  if (!currentUser || currentUser.status === 'INACTIVE') {
    return new AuthenticationError('not authenticated')
  }
  return skip
}

const requireAdmin = combineResolvers(
  authenticated,
  (_root, _args, { currentUser: { type } }) => {
    if (type !== 'ADMIN') {
      return new AuthenticationError('not authenticated as admin')
    }
    return skip
  }
)

const requireBusiness = combineResolvers(
  authenticated,
  (_root, _args, { currentUser: { type } }) => {
    if (type !== 'BUSINESS') {
      throw new AuthenticationError('not authenticated as business')
    }
    return skip
  }
)

const canCreateUser = combineResolvers(
  authenticated,
  (_root, args, { currentUser }) => {
    const createdUserType = args.type
    const currentUserType = currentUser.type
    if (!['ADMIN', 'BUSINESS'].includes(currentUserType) ||
        (createdUserType === 'ADMIN' && currentUserType !== 'ADMIN')) {
      return new AuthenticationError('not authenticated to create user')
    }
    return skip
  }
)

module.exports = {
  authenticated,
  requireAdmin,
  requireBusiness,
  canCreateUser
}

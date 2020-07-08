const config = require('./utils/config')
const app = require('./app')
const { tokenExtractor } = require('./utils/middleware')
const { ApolloServer } = require('apollo-server-express')
const { typeDefs } = require('./typeDefs')
const { resolvers } = require('./resolvers')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req ? req.headers.authorization : null
    const currentUser = await tokenExtractor(token)
    return { currentUser }
  }
})
server.applyMiddleware({ app })

app.listen({ port: config.PORT }, () => {
  console.log(`🚀 Server ready at ${config.PORT} with ${server.graphqlPath}`)
})

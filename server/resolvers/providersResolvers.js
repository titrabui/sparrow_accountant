const { UserInputError } = require('apollo-server-express')
const { combineResolvers } = require('graphql-resolvers')
const { requireAdmin } = require('./authorization')
const { Provider } = require('../models')
const mongoose = require('mongoose')

const providersResolvers = {
  Query: {
    fetchProviders: combineResolvers(
      requireAdmin,
      async (_root, args) => {
        const { params, sorter, filter } = args
        const { current = 1, pageSize = 10 } = params
        const providers = await Provider.find({})
        let dataSource = [...providers].slice((current - 1) * pageSize, current * pageSize)

        if (sorter) {
          dataSource = dataSource.sort((prev, next) => {
            let sortNumber = 0;
            Object.keys(sorter).forEach((key) => {
              if (sorter[key] === 'descend') {
                if (prev[key] - next[key] > 0) {
                  sortNumber += -1
                } else {
                  sortNumber += 1
                }

                return
              }

              if (prev[key] - next[key] > 0) {
                sortNumber += 1
              } else {
                sortNumber += -1
              }
            });
            return sortNumber
          })
        }

        if (filter) {
          if (Object.keys(filter).length > 0) {
            dataSource = dataSource.filter((item) =>
              Object.keys(filter).some((key) => {
                if (!filter[key]) {
                  return true
                }

                if (filter[key].includes(`${item[key]}`)) {
                  return true
                }

                return false
              }),
            )
          }
        }

        if (params.name) {
          dataSource = dataSource.filter((data) => data.name.includes(params.name || ''))
        }

        if (params.phone) {
          dataSource = dataSource.filter((data) => data.phone.includes(params.phone || ''))
        }

        if (params.address) {
          dataSource = dataSource.filter((data) => data.address.includes(params.address || ''))
        }

        return {
          data: dataSource,
          total: providers.length,
          success: true,
          pageSize,
          current: parseInt(`${params.currentPage}`, 10) || 1,
        }
      }
    )
  },
  Mutation: {
    createProvider: combineResolvers(
      requireAdmin,
      async (_root, args) => {
        try {
          const provider = new Provider(args)
          const savedProvider = await provider.save()
          return { success: !!savedProvider }
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
          await Provider.findByIdAndUpdate(args.id, args, { new: true })
          return { success: true }
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
          const promises = args.ids.map(async id => {
            return await Provider.findByIdAndRemove(id)
          })
          await Promise.all(promises)
          return { success: true }
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

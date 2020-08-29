const { UserInputError } = require('apollo-server-express')
const { combineResolvers } = require('graphql-resolvers')
const { requireAdmin } = require('./authorization')
const { Good, Provider } = require('../models')

const goodsResolvers = {
  Query: {
    fetchGoods: combineResolvers(
      requireAdmin,
      async (_root, args) => {
        const { params, sorter, filter } = args
        const { current = 1, pageSize = 10 } = params
        const goods = await Good.find({}).populate('provider')
        let dataSource = [...goods].slice((current - 1) * pageSize, current * pageSize)

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
                if (!filter[key]) return true
                return filter[key].includes(`${item[key]}`)
              }),
            )
          }
        }

        Object.keys(params).forEach((key) => {
          if (!['current', 'pageSize'].includes(key)) {
            dataSource = dataSource.filter((data) => data[key].includes(params[key]))
          }
        })

        return {
          data: dataSource,
          total: goods.length,
          success: true,
          pageSize,
          current: parseInt(`${params.currentPage}`, 10) || 1,
        }
      }
    )
  },
  Mutation: {
    createGood: combineResolvers(
      requireAdmin,
      async (_root, args) => {
        try {
          let data = args
          if (args.providerId) {
            const provider = await Provider.findById(args.providerId)
            data = { ...data, provider }
          }

          const good = new Good(data)
          await good.save()
          return { success: true }
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

          await Good.findByIdAndUpdate(args.id, good, { new: true }).populate('provider')
          return { success: true }
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
          const promises = args.ids.map(async id => {
            return await Good.findByIdAndRemove(id)
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
  goodsResolvers
}

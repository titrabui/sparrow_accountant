const mongoose = require('mongoose')

const providerSchema = mongoose.Schema({
  name: {
    type: String,
    minlength: 1,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    minlength: 10
  },
  address: {
    type: String,
    minlength: 5
  }
}, {
  timestamps: true
})

providerSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.hashedPassword
  }
})

module.exports = mongoose.model('Provider', providerSchema)

const mongoose = require('mongoose')

const goodSchema = mongoose.Schema({
  goodId: {
    type: String,
    minlength: 1,
    required: true,
    unique: true
  },
  name: {
    type: String,
    minlength: 5,
    required: true
  },
  specification: {
    type: String,
    minlength: 1,
    required: true
  },
  unit: {
    type: String,
    minlength: 1,
    required: true
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Provider'
  }
}, {
  timestamps: true
})

goodSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.hashedPassword

    if (returnedObject.provider) {
      returnedObject.provider.id = returnedObject.provider._id.toString()
      delete returnedObject.provider._id
      delete returnedObject.provider.__v
    }
  }
})

module.exports = mongoose.model('Good', goodSchema)

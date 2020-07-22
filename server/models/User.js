const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    minlength: 5,
    required: true,
    unique: true
  },
  email: {
    type: String,
    minlength: 5,
    required: true,
    unique: true,
    
    validate: {
      validator: v => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v),//eslint-disable-line
      //eslint-disable-next-line
      message: props => `${props.value} is not a valid email`
    }
  },
  status: {
    type: String,
    required: true,
    enum: ['ACTIVE', 'INACTIVE']
  },
  hashedPassword: {
    type: String,
    minlength: 3,
    required: true
  },
  type: {
    type: String,
    enum: ['ADMIN', 'BUSINESS', 'NORMAL']
  },
  name: {
    type: String,
    minlength: 5,
    required: true
  },
  avatar: {
    type: String,
    minlength: 5
  }
}, {
  timestamps: true
})

userSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.hashedPassword
  }
})

module.exports = mongoose.model('User', userSchema)

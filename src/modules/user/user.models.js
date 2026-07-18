const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['farmer', 'trader'],
    required: true,
  },
  location: {
    lga: {
      type: String,
      required: true,
    },
    state: {  
      type: String,
      required: true,
    }
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
  fullName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
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

  isVerified: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: String,
    default: null
},

otpExpiresAt: {
    type: Date,
    default: null
},
},
{
  timestamps: true,
}
);

const User = mongoose.model('User', userSchema);

module.exports = User;



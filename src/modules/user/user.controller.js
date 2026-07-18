const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./user.models');

const getMyProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
  return res.status(200).json({ message: 'Profile retrieved successfully', user });
};

const updateMyProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { fullName, phoneNumber, email } = req.body;  
    const user = await User.findByIdAndUpdate(userId, { fullName, phoneNumber, email }, { new: true }).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getMyProfile,
  updateMyProfile,
};
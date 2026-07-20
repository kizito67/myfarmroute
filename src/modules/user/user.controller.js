const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./user.models');

const getMyProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('-otp -otpExpiresAt -__v'); 
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'Profile retrieved successfully', 
        user: {
        _id: user._id,
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
        email: user.email,
        role: user.role,

        location: {
          lga: user.location.lga,
          state: user.location.state
        },

        isVerified: user.isVerified,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
     });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateMyProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { fullName, phoneNumber, profileImage } = req.body;  
    const updatedUser = await User.findByIdAndUpdate(userId, { fullName, phoneNumber, profileImage }, { new: true }).select('-otp -otpExpiresAt -__v');
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const user = await User.findById(id)
      .select("-otp -otpExpiresAt -__v");

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({
      success: true,
      message: 'User retrieved successfully',
      data: user
    });
  } catch (error) {
  console.error(error);

  res.status(500).json({
    message: error.message
  });
}
};

module.exports = {
  getMyProfile,
  updateMyProfile,
  getUserById
};
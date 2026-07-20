const User = require('../user/user.models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const generateToken = require('../../utils/generatetoken');
const generateOTP = require('../../utils/generateotp');



const SignUp = async (req, res) => {
    try {
        const { fullName, phoneNumber, location, email, role } = req.body;
        if (!fullName || !phoneNumber || !location || !location.lga || !location.state || !email || !role) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        if (!['farmer', 'trader'].includes(role)) {
            return res.status(400).json({ success: false, message: 'Role must be either farmer or trader' });
        }
        const existingUser = await User.findOne({ phoneNumber });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User with this phone number already exists' });
        }



        const {
            otp,
            otpExpiresAt,
        } = generateOTP();

        const newUser = await User.create({
            fullName, phoneNumber, role, location: { lga: location.lga, state: location.state }, email, otp, otpExpiresAt
        });
        const userResponse = {
            _id: newUser._id,
            fullName: newUser.fullName,
            phoneNumber: newUser.phoneNumber,
            role: newUser.role,
        };

        console.log(`OTP for ${phoneNumber}: ${otp}`); // Log OTP to console for testing purposes

        res.status(201).json({ success: true, message: 'User registered successfully. Please verify your phone number with the OTP sent.', data: { userId: newUser._id, phoneNumber: newUser.phoneNumber } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const verifyOTP = async (req, res) => {
    try {
        const { phoneNumber, otp } = req.body;
        if (!phoneNumber || !otp) {
            return res.status(400).json({ message: 'Phone number and OTP are required' });
        }

        const user = await User.findOne({ phoneNumber });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        if (new Date() > user.otpExpiry) {
            return res.status(400).json({ message: 'OTP has expired' });
        }

        user.isVerified = true;
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();

        const token = generateToken(user.id, user.role);

        return res.status(200).json({
            success: true,
            message: "OTP verified successfully",
            token,
            user: {
                _id: user._id,
                fullName: user.fullName,
                phoneNumber: user.phoneNumber,
                role: user.role,
                location: user.location
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { phoneNumber, } = req.body;
        if (!phoneNumber) {
            return res.status(400).json({ message: 'Phone number is required' });
        }
        const user = await User.findOne({ phoneNumber });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (!user.isVerified) {
            return res.status(403).json({ message: 'User is not verified. Please verify your phone number first.' });
        }
        const {
            otp,
            otpExpiresAt
        } = generateOTP();

        user.otp = otp;
        user.otpExpiresAt = otpExpiresAt;
        await user.save();

        console.log(`OTP for ${phoneNumber}: ${otp}`); // Log OTP to console for testing purposes   


        return res.status(200).json({
            success: true,
            message: "OTP sent successfully. Please verify your phone number with the OTP sent.",
            user: {
                _id: user._id,
                fullName: user.fullName,
                phoneNumber: user.phoneNumber,
                role: user.role,
                location: user.location
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const verifyLoginOTP = async (req, res) => {
    try {
        const { phoneNumber, otp } = req.body;

        const user = await User.findOne({ phoneNumber });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (user.otp !== otp) {
            return res.status(400).json({
                message: "Invalid OTP"
            });
        }

        if (
            !user.otpExpiresAt ||
            new Date() > user.otpExpiresAt
        ) {
            return res.status(400).json({
                message: "OTP has expired"
            });
        }

        user.otp = null;
        user.otpExpiresAt = null;

        await user.save();

        // Generate token HERE
        const token = generateToken(
            user._id,
            user.role
        );

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                _id: user._id,
                fullName: user.fullName,
                phoneNumber: user.phoneNumber,
                role: user.role,
                location: user.location
            },
            token
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    SignUp,
    verifyOTP,
    login,
    verifyLoginOTP
};


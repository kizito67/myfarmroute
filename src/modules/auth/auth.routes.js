const express = require("express");
const router = express.Router();
const authController = require("./auth.controller");



router.post("/signup", authController.SignUp);
router.post("/verify-otp", authController.verifyOTP);
router.post("/login", authController.login);
router.post("/verify-login-otp", authController.verifyLoginOTP);


module.exports = router;
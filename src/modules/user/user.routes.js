const express = require('express');
const router = express.Router();
const { getMyProfile, updateMyProfile } = require('./user.controller');
const { authenticate } = require('../middleware/auth.middleware');



router.get('/profile', authenticate, getMyProfile);
router.put('/profile', authenticate, updateMyProfile);

module.exports = router;
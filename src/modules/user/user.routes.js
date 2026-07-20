const express = require('express');
const router = express.Router();
const { getMyProfile, updateMyProfile, getUserById } = require('./user.controller');
const { authenticateToken} = require('../../middlewares/auth.middleware');



router.get('/me', authenticateToken, getMyProfile);
router.patch('/me', authenticateToken, updateMyProfile);
router.get('/:id', authenticateToken, getUserById);

module.exports = router;
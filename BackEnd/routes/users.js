const express = require('express');
const router = express.Router();
const { createUser, getUsers } = require('../controllers/usersController');

// Create a new user
router.post('/users', createUser);

// Get all users
router.get('/users', getUsers);

module.exports = router;

const express = require('express');
const { getUser, getUserById } = require('../controllers/userController');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

// Protected User Route
router.get('/getUser', authenticate, getUser);
router.get('/getById',getUserById)

module.exports = router;

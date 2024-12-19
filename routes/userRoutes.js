const express = require('express');
const { getUser } = require('../controllers/userController');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

// Protected User Route
router.get('/getUser', authenticate, getUser);


module.exports = router;

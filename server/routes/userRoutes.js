const express = require("express");
const userControllers = require('../controllers/userControllers');
const router = express.Router();

router.route('/users').get(userControllers.getAllUsers);

module.exports = router;
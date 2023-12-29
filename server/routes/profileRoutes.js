const express = require("express");
const profileControllers = require('../controllers/profileControllers');
const router = express.Router();

router.route('/profile').get(profileControllers.getProfile);

module.exports = router;
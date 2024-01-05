const express = require("express");
const userControllers = require('../controllers/userControllers');
const router = express.Router();

router.route('/users/get/:username').get(userControllers.findUser);
router.route('/users/updatePic').put(userControllers.updatePic);

module.exports = router;
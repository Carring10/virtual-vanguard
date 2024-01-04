const express = require("express");
const authControllers = require('../controllers/authControllers');
const router = express.Router();

router.route('/auth/register').post(authControllers.register);
router.route('/auth/login').post(authControllers.login);
router.route('/auth/logout').delete(authControllers.logout);

module.exports = router;
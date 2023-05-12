const express = require("express");
const authControllers = require('../controllers/authControllers');
const router = express.Router();

router.route('/auth').post(authControllers.register);
router.route('/auth').get(authControllers.login);
router.route('/auth').get(authControllers.logout);

module.exports = router;
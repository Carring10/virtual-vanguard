const express = require("express");
const commentControllers = require('../controllers/commentControllers');
const router = express.Router();

router.route('/comments').get(commentControllers.getAllComments);

module.exports = router;
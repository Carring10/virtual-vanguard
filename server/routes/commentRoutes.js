const express = require("express");
const commentControllers = require('../controllers/commentControllers');
const router = express.Router();

router.route('/comments').get(commentControllers.getAllComments);
router.route('/comments').post(commentControllers.addComment);
router.route('/comments').delete(commentControllers.getAllComments);

module.exports = router;
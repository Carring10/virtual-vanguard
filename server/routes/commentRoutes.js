const express = require("express");
const commentControllers = require('../controllers/commentControllers');
const router = express.Router();

router.route('/comments/:articleId').get(commentControllers.getComments);
router.route('/comments').post(commentControllers.addComment);

module.exports = router;
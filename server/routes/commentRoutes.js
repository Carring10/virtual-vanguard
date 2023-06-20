const express = require("express");
const commentControllers = require('../controllers/commentControllers');
const router = express.Router();

router.route('/comments/:articleId')
  .get(commentControllers.getComments)
  .delete(commentControllers.deleteAll);
  
router.route('/comments').post(commentControllers.addComment);

module.exports = router;
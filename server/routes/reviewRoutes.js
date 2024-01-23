const express = require("express");
const reviewControllers = require('../controllers/reviewControllers');
const router = express.Router();

router.route('/reviews/:gameId').get(reviewControllers.getReviews);

router.route('/reviews/:gameId/:parentId').get(reviewControllers.getReplies);

router.route('/reviews/:id/:userId').delete(reviewControllers.deleteReview);
  
router.route('/reviews').post(reviewControllers.addReview);

module.exports = router;
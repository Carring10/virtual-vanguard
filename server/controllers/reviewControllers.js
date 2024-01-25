const Review = require('../models/Review');

const moment = require('moment');

exports.getReviews = async (req, res) => {
  try {
    const gameId = req.params.gameId;
    console.log(req.params)

    const [reviews, _] = await Review.getReviews(gameId);

    res.status(200).json({ reviews });
  } catch (err) {
    console.log(err);
  }
}

exports.getReplies = async (req, res) => {
  try {
    const parentId = req.params.parentId;
    const gameId = req.params.gameId

    const [replies, _] = await Review.getReplies(gameId, parentId)

    res.status(200).json({ replies });
  } catch (err) {
    console.log(err);
  }
}

exports.addReview = async (req, res) => {
  try {
    // const token = req.cookies.accessToken;
    // if (!token) return res.status(403).json({ message: 'Not logged in' });

    const createdAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    const { userId, content, gameId, parentId } = req.body;

    const review = new Review(userId, content, createdAt, gameId, parentId || null);

    await review.addReview();

    res.status(200).json({ message: 'review created' });
  } catch (err) {
    console.log(err)
  }
}

exports.deleteReview = async (req, res) => {
  try {
    const { id, userId } = req.params;

    await Review.deleteReview(id, userId);

    res.status(200).json({ message: 'review deleted' });
  } catch (err) {
    console.log(err)
  }
}
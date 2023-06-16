const Comment = require('../models/Comment');

const moment = require('moment');

exports.getComments = async (req, res) => {
  try {
    const articleId = req.params.userId;

    await Comment.getComments(articleId);
  } catch (err) {
    console.log(err);
  }
}

exports.addComment = async (req, res) => {
  try {
    const createdAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    const { userId, content, articleId } = req.body;

    let comment = new Comment(userId, content, createdAt, articleId);

    await comment.add();

    res.status(200).json({ message: 'comment created' });
  } catch(err) {
    console.log(err)
  }
}
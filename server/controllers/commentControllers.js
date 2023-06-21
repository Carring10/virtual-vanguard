const Comment = require('../models/Comment');

const moment = require('moment');

exports.getComments = async (req, res) => {
  try {
    const articleId = req.params.articleId;

    const [comments, _] = await Comment.getComments(articleId);

    res.status(200).json({ comments });
  } catch (err) {
    console.log(err);
  }
}

exports.addComment = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return res.status(403).json({ message: 'Not logged in' });

    const createdAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    const { userId, content, articleId } = req.body;

    let comment = new Comment(userId, content, createdAt, articleId);

    await comment.add();

    res.status(200).json({ message: 'comment created' });
  } catch(err) {
    console.log(err)
  }
}

exports.deleteComment = async (req, res) => {
  try {
    console.log(req.params)
    const { id, userId } = req.body;

    await Comment.deleteComment(id, userId);

    res.status(200).json({ message: 'comment deleted' });
  } catch (err) {
    console.log(err)
  }
}
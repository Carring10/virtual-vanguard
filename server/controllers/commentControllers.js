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

exports.getReplies = async (req, res) => {
  try {
    const parentId = req.params.parentId;
    const articleId = req.params.articleId

    const [replies, _] = await Comment.getReplies(articleId, parentId)

    res.status(200).json({ replies });
  } catch (err) {
    console.log(err);
  }
}

exports.addComment = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return res.status(403).json({ message: 'Not logged in' });

    const createdAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    const { userId, content, articleId, parentId } = req.body;

    const comment = new Comment(userId, content, createdAt, articleId, parentId || null);

    await comment.add();

    res.status(200).json({ message: 'comment created' });
  } catch (err) {
    console.log(err)
  }
}

exports.deleteComment = async (req, res) => {
  try {
    const { id, userId } = req.params;

    await Comment.deleteComment(id, userId);

    res.status(200).json({ message: 'comment deleted' });
  } catch (err) {
    console.log(err)
  }
}
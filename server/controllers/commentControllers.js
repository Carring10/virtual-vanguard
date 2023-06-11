const Comment = require('../models/Comment');

const moment = require('moment');

exports.getAllComments = async (req, res) => {
  res.send("Get all comments route!")
}

exports.addComment = async (req, res) => {
  try {
    // const userId = req.body.userId
    const content = req.body.content;
    const createdAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    // const articleId = req.body.articleId;

    let comment = new Comment(content, createdAt);

    await comment.add();

    res.status(200).json({ message: 'comment created' });
  } catch(err) {
    console.log(err)
  }
}
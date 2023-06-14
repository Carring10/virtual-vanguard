const db = require('../config/connection');

class Comment {
  constructor(userId, content, createdAt, articleId) {
    this.userId = userId;
    this.content = content;
    this.createdAt = createdAt;
    this.articleId = articleId;
  }

  static getComments() {
    let sql = `SELECT * FROM comments;`

    return db.execute(sql);
  }

  add() {
    let sql = `
    INSERT INTO comments(
      userId,
      content,
      createdAt,
      articleId
    )
    VALUES(
      '${this.userId}',
      '${this.content}',
      '${this.createdAt}',
      '${this.articleId}'
    )
    `;

    const newComment = db.execute(sql);

    return newComment;
  }
}

module.exports = Comment;
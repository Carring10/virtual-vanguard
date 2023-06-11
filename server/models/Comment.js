const db = require('../config/connection');

class Comment {
  constructor(content, createdAt) {
    // this.userId = userId;
    this.content = content;
    this.createdAt = createdAt;
    // this.articleId = articleId;
  }

  static getComments() {
    let sql = `SELECT * FROM comments;`

    return db.execute(sql);
  }

  add() {
    let sql = `
    INSERT INTO comments(
      content,
      createdAt
    )
    VALUES(
      '${this.content}',
      '${this.createdAt}'
    )
    `;

    const newComment = db.execute(sql);

    return newComment;
  }
}

module.exports = Comment;
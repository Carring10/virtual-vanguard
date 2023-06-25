const db = require('../config/connection');

class Comment {
  constructor(userId, content, createdAt, articleId, parentId) {
    this.userId = userId;
    this.content = content;
    this.createdAt = createdAt;
    this.articleId = articleId;
    this.parentId = parentId;
  }

  static getComments(articleId) {
    let sql = `
    SELECT * FROM comments 
    LEFT JOIN users 
    ON comments.userId = users.id 
    LEFT JOIN (
    SELECT
        parentId,
        COALESCE(JSON_ARRAYAGG(JSON_OBJECT('userId', replies.userId, 'content', replies.content)), '[]') AS replies
    FROM
        comments AS replies
    GROUP BY
        parentId
) AS replies ON comments.commentId = replies.parentId
    WHERE comments.parentId is NULL
    AND articleId = ${articleId}
    ORDER BY createdAt DESC;
    `;

    return db.execute(sql);
  }

  add() {
    let sql = `
    INSERT INTO comments(
      userId,
      content,
      createdAt,
      articleId,
      parentId
    )
    VALUES(
      '${this.userId}',
      '${this.content}',
      '${this.createdAt}',
      '${this.articleId}',
       ${this.parentId}
    );
    `;

    const newComment = db.execute(sql);

    return newComment;
  }

  static deleteComment(id, userId) {
    let sql = `
    DELETE FROM comments
    WHERE commentId = ${id}
    AND userId = ${userId};
    `;

    return db.execute(sql);
  }
}

module.exports = Comment;
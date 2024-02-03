const db = require('../config/connection');

class Review {
  constructor(userId, content, createdAt, gameId, recommended) {
    this.userId = userId;
    this.content = content;
    this.createdAt = createdAt;
    this.gameId = gameId;
    this.recommended = recommended;
  }

  static getReviews(gameId) {
    let sql = `
    SELECT * FROM reviews
    WHERE gameId = ${gameId}
    ORDER BY createdAt DESC;
    `;

    return db.execute(sql);
  }

  static getReplies(gameId, parentId) {
    let sql = `
    SELECT * FROM comments
    LEFT JOIN users ON comments.userId = users.id
    WHERE parentId = ${parentId}
    AND gameId = ${gameId}
    ORDER BY createdAt DESC;
    `;

    return db.execute(sql);
  }

  addReview() {
    let sql = `
    INSERT INTO reviews(
      userId,
      content,
      createdAt,
      gameId,
      recommended
    )
    VALUES(
      '${this.userId}',
      '${this.content}',
      '${this.createdAt}',
      '${this.gameId}',
      '${this.recommended}'
    );
    `;

    const newReview = db.execute(sql);

    return newReview;
  }

  static deleteReview(id, userId) {
    let sql = `
    DELETE FROM reviews
    WHERE reviewId = ${id}
    AND userId = ${userId};
    `;

    return db.execute(sql);
  }
}

module.exports = Review;
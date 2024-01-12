const db = require('../config/connection');

class Games {
  constructor(user, savedGameId) {
    this.username = user;
    this.savedGameId = savedGameId;
  }

  addGame() {
    let sql = `
    INSERT INTO games(
      user,
      savedGameId
    )
    VALUES(
      '${this.user}',
      '${this.savedGameId}'
    );
    `;

    const newComment = db.execute(sql);

    return newComment;
  }

  static getGames(username, gameId) {
    let sql = `
    SELECT * FROM games
    LEFT JOIN users ON games.userId = users.id
    WHERE user = ${username};
    `;

    return db.execute(sql);
  }
}
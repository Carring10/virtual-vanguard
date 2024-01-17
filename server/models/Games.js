const db = require('../config/connection');

class Games {
  constructor(user, savedGameId) {
    this.user = user;
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

  static getGames(user) {
    let sql = `SELECT * FROM games WHERE user = '${user}';`;

    return db.execute(sql);
  }

  static deleteGame(savedGameId, user) {
    let sql = `
    DELETE FROM games
    WHERE savedGameId = ${savedGameId}
    AND user = '${user}';
    `;

    return db.execute(sql);
  }
}


module.exports = Games;
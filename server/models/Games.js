const db = require('../config/connection');

class Games {
  constructor(user, apiId, gameTitle, gameImg, gameGenre) {
    this.user = user;
    this.apiId = apiId;
    this.gameTitle = gameTitle;
    this.gameImg = gameImg;
    this.gameGenre = gameGenre;
  }

  addGame() {
    let sql = `
    INSERT INTO games(
      user,
      apiId,
      gameTitle, 
      gameImg,
      gameGenre
    )
    VALUES(
      '${this.user}',
      '${this.apiId}',
      '${this.gameTitle}',
      '${this.gameImg}',
      '${this.gameGenre}'
    );
    `;

    const newComment = db.execute(sql);

    return newComment;
  }

  static getGames(user) {
    let sql = `SELECT * FROM games WHERE user = '${user}';`;

    return db.execute(sql);
  }

  static deleteGame(user, apiId) {
    let sql = `
    DELETE FROM games
    WHERE apiId = ${apiId}
    AND user = '${user}';
    `;

    return db.execute(sql);
  }
}


module.exports = Games;
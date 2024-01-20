const db = require('../config/connection');

class Games {
  constructor(user, apiId, gameTitle, gameImg, gameGenre, gameUrl) {
    this.user = user;
    this.apiId = apiId;
    this.gameTitle = gameTitle;
    this.gameImg = gameImg;
    this.gameGenre = gameGenre;
    this.gameUrl = gameUrl;
  }

  addGame() {
    let sql = `
    INSERT INTO games(
      user,
      apiId,
      gameTitle, 
      gameImg,
      gameGenre,
      gameUrl
    )
    VALUES(
      '${this.user}',
      '${this.apiId}',
      '${this.gameTitle}',
      '${this.gameImg}',
      '${this.gameGenre}',
      '${this.gameUrl}'
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
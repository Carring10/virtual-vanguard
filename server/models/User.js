const db = require('../config/connection');

class User {
  constructor(username, password, profilePic, savedGames) {
    this.username = username;
    this.password = password;
    this.profilePic = profilePic;
    this.savedGames = savedGames;
  }

  static get(username) {
    let sql = `SELECT * FROM users WHERE username = "${username}";`;

    return db.execute(sql);
  }

  create() {
    let sql = `
    INSERT INTO users(
      username,
      password
    )
    VALUES(
      '${this.username}',
      '${this.password}'
    )
    `;

    const newUser = db.execute(sql);

    return newUser;
  }

  static update(username, profilePic) {
    let sql = `UPDATE users SET profilePic = "${profilePic}" WHERE username = "${username}";`

    return db.execute(sql);
  }

  static saveGame(username, gameId) {
    let sql = `UPDATE users SET savedGames = "${gameId}" WHERE username = "${username}";`

    return db.execute(sql);
  }
}

module.exports = User;
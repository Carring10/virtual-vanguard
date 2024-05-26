const db = require('../config/connection');

class User {
  constructor(username, password, profilePic, savedGames) {
    this.username = username;
    this.password = password;
    this.profilePic = profilePic;
    this.savedGames = savedGames;
  }

  static getUser(username) {
    let sql = `SELECT * FROM users WHERE username = "${username}";`;

    return db.execute(sql);
  }

  create() {
    let sql = `
    INSERT INTO users(
      username,
      password,
      profilePic
    )
    VALUES(
      '${this.username}',
      '${this.password}',
      'default-pic.jpg'
    )
    `;

    const newUser = db.execute(sql);

    return newUser;
  }

  static update(username, profilePic) {
    let sql = `UPDATE users SET profilePic = "${profilePic}" WHERE username = "${username}";`

    return db.execute(sql);
  }
}

module.exports = User;
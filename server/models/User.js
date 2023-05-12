const db = require('../config/connection');

class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  static findUser(username) {
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
}

module.exports = User;
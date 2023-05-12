const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  try {
    const username = req.body.username;
    const [userExists, _] = await User.findUser(username);
    // If a user already exists, do not save it to the database.
    if (userExists.length != 0) {
      return res.status(409).json({ message: "User already exists!" });
    } else {
      // Hash the password before saving to the database, salt it 10 times.
      const password = await bcrypt.hash(req.body.password, 10);
      let user = new User(username, password);
      await user.create();

      res.status(201).json({ user });
    }
  } catch (err) {
    console.log(err);
  }
}

exports.login = async (req, res) => {
  res.send("Get all articles route!")
}

exports.logout = async (req, res) => {
  res.send("Get all articles route!")
}
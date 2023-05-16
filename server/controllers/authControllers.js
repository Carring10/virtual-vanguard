const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  try {
    const username = req.body.username;
    const [userData, _] = await User.findUser(username);
    // If a user already exists, do not save it to the database.
    if (userData.length != 0) {
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
  try {
    const username = req.body.username;
    const [userData, _] = await User.findUser(username);

    if (userData.length === 0) {
      return res.status(404).json({ message: "Username is incorrect." })
    }
    // Use `bcrypt.compare()` to compare the provided password and the hashed password
    const validPassword = await bcrypt.compare(
      req.body.password,
      userData[0].password
    );
    // If they do not match, return error message
    if (!validPassword) {
      return res.status(400).json({ message: 'Login failed. Please try again!' });
    }
    // If they do match, return success message
    res.status(200).json({ message: 'You are now logged in!' });

  } catch (err) {
    console.log(err);
  }
}

exports.logout = async (req, res) => {
  res.send("Get all articles route!")
}
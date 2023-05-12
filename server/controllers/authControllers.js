const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  // Check if user exists
  try {
    const username = req.params.username;

    await User.findUser(username);

    res.status(409).json({ message: "User already exists" });
  } catch (err) {
    console.log(err);
  }

  // Create new user
  try {
    const username = req.body.username;
    // Hash the password before saving to the database
    const password = await bcrypt.hash(req.body.password, 10);
    
    let user = new User(username, password);

    await user.create();

    res.status(201).json({ user });
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
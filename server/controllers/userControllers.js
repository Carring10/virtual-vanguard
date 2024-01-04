const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
  res.send("Get all users route!")
}

exports.updatePic = async (req, res) => {
  try {
    const username = req.body.username;
    const profilePic = req.body.profilePic;
    console.log(req.body);

    await User.update(username, profilePic);

    res.json("success")

  } catch (err) {
    console.log(err)
  }
}

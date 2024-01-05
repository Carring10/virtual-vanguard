const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
  res.send("Get all users route!")
}

exports.findUser = async (req, res) => {
  try {
    const username = req.params.username;

    const [user, _] = await User.get(username);

    res.json(user)
  } catch (err) {
    console.log(err);
  }
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

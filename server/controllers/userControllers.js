const User = require('../models/User');

exports.findUser = async (req, res) => {
  try {
    const username = req.params.username;

    const [user, _] = await User.getUser(username);
    console.log("find", user)

    res.json(user)
  } catch (err) {
    console.log(err);
  }
}

exports.updatePic = async (req, res) => {
  try {
    const username = req.body.username;
    const profilePic = req.body.profilePic;

    await User.update(username, profilePic);

    res.json("success")

  } catch (err) {
    console.log(err)
  }
}

exports.saveGame = async (req, res) => {
  try {
    const username = req.body.username;
    const gameId = req.body.gameId;

    await User.saveGame(username, gameId);

    res.json("success")

  } catch (err) {
    console.log(err)
  }
}

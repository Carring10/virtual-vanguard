const Games = require('../models/Games');

exports.getGames = async (req, res) => {
  try {
    const user = req.body.user;
    console.log(req.body.user)

    const [games, _] = await Games.getGames(user);

    res.status(200).json({ games });
  } catch (err) {
    console.log(err);
  }
}

exports.addGame = async (req, res) => {
  try {
    const { user, savedGameId } = req.body;
    console.log(req.body)

    const game = new Games(user, savedGameId);

    await game.addGame();

    res.status(200).json({ message: 'game added' });
  } catch (err) {
    console.log(err)
  }
}

exports.deleteGame = async (req, res) => {
  try {
    const { user, savedGameId } = req.body;
    console.log("delete", req.body)

    await Games.deleteGame(user, savedGameId);

    res.status(200).json({ message: 'Game deleted' });
  } catch (err) {
    console.log(err)
  }
}
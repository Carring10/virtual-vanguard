const express = require("express");
const gameControllers = require('../controllers/gameControllers');
const router = express.Router();

router.route('/games').post(gameControllers.addGame);
router.route('/games/delete').delete(gameControllers.deleteGame);
router.route('/games/getGames/:user').get(gameControllers.getGames);


module.exports = router;
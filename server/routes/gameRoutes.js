const express = require("express");
const gameControllers = require('../controllers/gameControllers');
const router = express.Router();

router.route('/games/get').get(gameControllers.getGames);
router.route('/games').post(gameControllers.addGame);
router.route('/games/delete').delete(gameControllers.deleteGame);

module.exports = router;
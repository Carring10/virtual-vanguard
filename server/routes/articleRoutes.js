const express = require("express");
const articleControllers = require('../controllers/articleControllers');
const router = express.Router();

router.route('/articles').get(articleControllers.getAllArticles);

module.exports = router;
const express = require("express");
const bookmarkControllers = require('../controllers/bookmarkControllers');
const router = express.Router();

router.route('/bookmarks').get(bookmarkControllers.getAllBookmarks);

module.exports = router;
const express = require('express')
const controllers = require('./controllers/')
const router = express.Router()

router.get('/bookmarks', controllers.Bookmark.getAllBookmarks)
router.get('/bookmarks/archive', controllers.Bookmark.getArchivedBookmarks)
router.get('/bookmarks/star', controllers.Bookmark.getStarredBookmarks)

module.exports = router
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { TagController, BookmarkController } = require('./controllers');

const server = express();

const PORT = process.env.PORT || 3000;

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(cors());

server.use(express.static(path.join(__dirname, '..', 'build')));

const router = express.Router();

router.get('/bookmarks', BookmarkController.getBookmarks);
router.get('/bookmarks/:id', BookmarkController.getBookmark);
router.post('/bookmarks', BookmarkController.createBookmark);
router.delete('/bookmarks/:id', BookmarkController.destroyBookmark);
router.patch('/bookmarks/:id', BookmarkController.updateBookmark);
router.patch('/bookmarks/:id/tags', BookmarkController.setTags);

router.get('/tags', TagController.getTags);
router.get('/tags/:id', TagController.getTag);
router.patch('/tags/:id', TagController.updateTag);
router.delete('/tags/:id', TagController.destroyTag);

server.use('/api', router);

server.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

function initServer() {
  server.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
  });
}

module.exports = initServer;

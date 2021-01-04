const Sequelize = require('sequelize');
const BookmarkModel = require('./bookmark.model');
const TagModel = require('./tag.model');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './paperboard.sqlite',
  logging: false,
});

const Bookmark = BookmarkModel(sequelize, Sequelize);
const Tag = TagModel(sequelize, Sequelize);

Bookmark.belongsToMany(Tag, {
  through: 'bookmarkTags',
});

Tag.belongsToMany(Bookmark, {
  through: 'bookmarkTags',
});

sequelize.sync();

module.exports = {
  Bookmark,
  Tag,
};

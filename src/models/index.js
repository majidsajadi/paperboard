const Sequelize = require('sequelize')
const BookmarkModel = require('./bookmark')
const TagModel = require('./tag')
const core = require('../core')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: core.getDatabasePath(),
    logging: false
})

const Bookmark = BookmarkModel(sequelize, Sequelize)
const Tag = TagModel(sequelize, Sequelize)

Bookmark.belongsToMany(Tag, {
    through: 'bookmarkTags'
});

Tag.belongsToMany(Bookmark, {
    through: 'bookmarkTags'
});

sequelize.sync()

module.exports = {
    Bookmark,
    Tag
}
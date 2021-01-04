const models = require('../models')

const getAllBookmarks = async (attributes) => {
    const bookmarks = await models.Bookmark.findAll({
        attributes,
        where: { archive: false }
    })

    return bookmarks
}

const getArchivedBookmarks = async (attributes) => {
    const bookmarks = await models.Bookmark.findAll({
        attributes,
        where: { archive: true }
    })

    return bookmarks
}

const getStarredBookmarks = async (attributes) => {
    const bookmarks = await models.Bookmark.findAll({
        attributes,
        where: {
            archive: false,
            star: true
        }
    })

    return bookmarks
}

module.exports = {
    getAllBookmarks,
    getArchivedBookmarks,
    getStarredBookmarks
}
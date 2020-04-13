const korgin = require('../korgin')

const getAllBookmarks = async (req, res) => {
    const attributes = [
        'id',
        'title',
        'hostname',
        'star',
        'excerpt',
    ]

    const bookmarks = await korgin.getAllBookmarks(attributes)

    res.json(bookmarks)
}


const getArchivedBookmarks = async (req, res) => {
    console.log(123)
    const attributes = [
        'id',
        'title',
        'hostname',
        'star',
        'excerpt',
    ]

    const bookmarks = await korgin.getArchivedBookmarks(attributes)

    res.json(bookmarks)
}

const getStarredBookmarks = async (req, res) => {
    const attributes = [
        'id',
        'title',
        'hostname',
        'star',
        'excerpt',
    ]

    const bookmarks = await korgin.getStarredBookmarks(attributes)

    res.json(bookmarks)
}


module.exports = {
    getAllBookmarks,
    getArchivedBookmarks,
    getStarredBookmarks
}
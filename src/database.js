const models = require('./models');

const findBookmarkByHref = async (href) => {
    try {
        const bookmark = await models.Bookmark.findOne({
            where: { href }
        })

        return bookmark
    } catch (error) {
        throw new Error('Finding bookmark failed')
    }
}

const createBookmark = async (data, tags) => {
    try {
        const bookmark = await models.Bookmark.create({
            href: data.href,
            hostname: data.hostname,
            title: data.title,
            excerpt: data.excerpt,
            content: data.content,
        })

        await addTagsToBookmark(bookmark.id, tags)

        return bookmark
    } catch (error) {
        throw new Error('Creating bookmark failed')
    }
}

const getAllBookmarks = async (options) => {
    try {
        const where = {
            archive: options.archive || false,
        }

        if (options.star) {
            where.star = true
        }

        const bookmarks = await models.Bookmark.findAll({ where, include: [models.Tag] })

        return bookmarks
    } catch (error) {
        throw new Error('Fetching bookmark from database failed')
    }
}

const findBookmarkById = async (id) => {
    try {
        const bookmark = await models.Bookmark.findByPk(id, {
            include: [models.Tag]
        })
        return bookmark
    } catch (error) {
        throw new Error('Finding bookmark failed')
    }
}

const updateBookmarkStar = async (id) => {
    try {
        const bookmark = await findBookmarkById(id)
        const updated = await bookmark.update({
            star: !bookmark.star
        })
        return updated
    } catch (error) {
        throw new Error('Updating bookmark failed')
    }
}

const updateBookmarkArchive = async (id) => {
    try {
        const bookmark = await findBookmarkById(id)
        const updated = await bookmark.update({
            archive: !bookmark.archive
        })
        return updated
    } catch (error) {
        throw new Error('Updating bookmark failed')
    }
}

const deleteBookmarkById = async (id) => {
    try {
        const deletedRows = await models.Bookmark.destroy({
            where: { id }
        })

        return deletedRows === 1
    } catch (error) {
        throw new Error('Deleting bookmark failed')
    }
}

const addTagsToBookmark = async (id, tags) => {
    try {
        const bookmark = await findBookmarkById(id)
        const storedTags = await Promise.all(tags.map(tag => {
            return models.Tag.findOrCreate({ where: { name: tag } })
        }))

        await bookmark.addTags(storedTags.map(tag => tag[0]))
    } catch (error) {
        throw new Error('Adding tags to bookmark failed')
    }
}

const removeTagsFromBookmark = async (id, tags) => {
    try {
        const bookmark = await findBookmarkById(id)
        const bookmarkTags = await bookmark.getTags()

        await bookmark.setTags(bookmarkTags.filter(tag => !tags.includes(tag.name)))
    } catch (error) {
        throw new Error('Removing tags from bookmark failed')
    }
}

const getAllTags = async () => {
    try {
        const tags = await models.Tag.findAll()
        return tags
    } catch (error) {
        throw new Error('Finding tags failed')
    }
    
}

module.exports = {
    getAllBookmarks,
    getAllTags,
    findBookmarkByHref,
    createBookmark,
    findBookmarkById,
    deleteBookmarkById,
    updateBookmarkArchive,
    updateBookmarkStar,
    addTagsToBookmark,
    removeTagsFromBookmark
}
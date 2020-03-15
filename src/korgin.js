const database = require('./database');
const render = require('./render');
const core = require('./core');

const add = async (url, tags) => {
    try {
        const parsedUrl = core.parseUrl(url)
        const bookmark = await database.findBookmarkByHref(parsedUrl.href)

        if (!bookmark) {
            render.warn('Downloading bookmark...')
            const raw = await core.fetchBookmark(parsedUrl.href)

            render.warn('Parsing bookmark...')
            const parsed = core.parseBookmarkContent(raw)

            const newBookmark = {
                href: parsedUrl.href,
                hostname: parsedUrl.hostname,
                title: parsed.title,
                excerpt: parsed.excerpt,
                content: parsed.content
            }

            if (tags) {
                tags = core.parseTags(tags)
            }

            await database.createBookmark(newBookmark, tags)

            render.success('Bookmark created successfully')
        } else {
            render.success('Bookmark already exists')
        }
    } catch (error) {
        render.error(error.message)
    }
}

const list = async (options) => {
    try {
        const star = options.star
        const archive = options.archive

        const bookmarks = await database.getAllBookmarks({
            archive,
            star
        })

        if (bookmarks) {
            if (options.tag) {
                const tags = await database.getAllTags()
                render.displayBookmarksByTag(bookmarks, tags)
            } else {
                render.displayBookmarks(bookmarks)
            }
        } else {
            render.error('Cant find any bookmark');
        }
    } catch (error) {
        render.error(error.message)
    }
}

const star = async (id) => {
    try {
        const bookmark = await database.updateBookmarkStar(id)

        if (bookmark.star) {
            render.success('Bookmark starred successfully')
        } else {
            render.success('Bookmark unstarred successfully')
        }
    } catch (error) {
        render.error(error.message)
    }
}

const archive = async (id) => {
    try {
        const bookmark = await database.updateBookmarkArchive(id)

        if (bookmark.archive) {
            render.success('Bookmark archived successfully')
        } else {
            render.success('Bookmark restored successfully')
        }
    } catch (error) {
        render.error(error.message)
    }
}

const destroy = async (id) => {
    try {
        const deleted = await database.deleteBookmarkById(id)

        if (deleted) {
            render.success('Bookmark deleted successfully')
        }
    } catch (error) {
        render.error(error.message)
    }
}

const addTag = async (id, tags) => {
    try {
        tags = core.parseTags(tags)
        await database.addTagsToBookmark(id, tags)
        render.success('Tags added to bookmark successfully')
    } catch (error) {
        render.error(error.message)
    }
}

const removeTag = async (id, tags) => {
    try {
        tags = core.parseTags(tags)
        await database.removeTagsFromBookmark(id, tags)
        render.success('Tags removed from bookmark successfully')
    } catch (error) {
        render.error(error.message)
    }
}

const open = async (id) => {
    try {
        const bookmark = await database.findBookmarkById(id);
        await core.openBrowser(bookmark.href)
    } catch (error) {
        render.error(error.message)
    }
}

const read = async (id) => {
    try {
        const bookmark = await database.findBookmarkById(id)
        const filePath = await core.makeTempFile(bookmark)
        await core.openBrowser(filePath)
    } catch (error) {
        render.error(error.message);
    }
}

module.exports = {
    add,
    destroy,
    list,
    open,
    read,
    archive,
    star,
    addTag,
    removeTag
}
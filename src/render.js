const { Signale } = require('signale')
const chalk = require('chalk')
const dayjs = require('dayjs')

const options = {
    types: {
        debug: {
            color: false
        },
        await: {
            badge: false
        }
    }
};

const signale = new Signale(options);
signale.config({
    displayLabel: false,
});

const { warn, success, error, star, note, log, await: print } = signale
const { gray, magenta, cyan, bold, underline } = chalk

const getTags = (bookmark) => {
    let tags = ''

    if (!bookmark.tags || !bookmark.tags.length) {
        return tags
    }   

    bookmark.tags.forEach(tag => {
        tags += `@${tag.name} `
    })

    return tags
}

const getCreatedAt = (bookmark) => {
    return dayjs(bookmark.createdAt).format("YY MMM DD")
}

const getExcerpt = (bookmark) => {
    return bookmark.excerpt.substring(0,124) + '...';
}

const logBookmarkWithTag = (bookmark) => {
    const tags = getTags(bookmark)
    const data = { prefix: bookmark.id, message: bookmark.title, suffix: magenta(tags) }
    if (bookmark.star) {
        star(data)
    } else {
        note(data)
    }
}

const logBookmark = (bookmark) => {
    const createdAt = getCreatedAt(bookmark)
    const data = { prefix: bookmark.id, message: bookmark.title, suffix: magenta(createdAt) }
    if (bookmark.star) {
        star(data)
    } else {
        note(data)
    }
}

const logDetails = (bookmark) => {
    const excerpt = getExcerpt(bookmark)
    print({ prefix: "    ", message: underline(gray(bookmark.hostname)) })
    print({ prefix: "    ", message: gray(excerpt) })
}

const logTag = (tag) => {
    log({ message: bold(cyan(`@${tag.name}`)) })
}

const displayBookmarks = (bookmarks, options) => {
    bookmarks.map(bookmark => {
        logBookmarkWithTag(bookmark)
        if (options.detail) {
            logDetails(bookmark)
        }
    })
}

const displayBookmarksByTag = (bookmarks, tags, options) => {
    tags.map(tag => {
        const filteredBookmarks = bookmarks.filter(bookmark => {
            const bookmarkTags = bookmark.tags.map(tag => tag.name)
            return bookmarkTags.includes(tag.name)
        })
        if (filteredBookmarks.length) {
            logTag(tag)
            filteredBookmarks.forEach(bookmark => {
                logBookmark(bookmark)
                if (options.detail) {
                    logDetails(bookmark)
                }
            })
        }
    })
}

module.exports = {
    warn,
    success,
    error,
    displayBookmarks,
    displayBookmarksByTag
}
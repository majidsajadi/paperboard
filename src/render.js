const { Signale } = require('signale')
const chalk = require('chalk')
const dayjs = require('dayjs')

const options = {
    types: {
        debug: {
            color: 'blue'
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
const { gray, blue, magenta, cyan, bold, underline } = chalk

const getTags = (bookmark) => {
    let tags = ''

    if (!bookmark.tags.length) {
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

const logBookmarkWithTag = (bookmark) => {
    const tags = getTags(bookmark)
    const data = { prefix: blue(bookmark.id), message: bookmark.title, suffix: magenta(tags) }
    if (bookmark.star) {
        star(data)
    } else {
        note(data)
    }
}

const logBookmark = (bookmark) => {
    const createdAt = getCreatedAt(bookmark)
    const data = { prefix: blue(bookmark.id), message: bookmark.title, suffix: magenta(createdAt) }
    if (bookmark.star) {
        star(data)
    } else {
        note(data)
    }
}

const logDetails = (bookmark) => {
    print({ prefix: "    ", message: underline(gray(bookmark.hostname)) })
    print({ prefix: "    ", message: gray(bookmark.excerpt) })
}

const logTag = (tag) => {
    log({ message: bold(cyan(`@${tag.name}`)) })
}

const displayBookmarks = (bookmarks) => {
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
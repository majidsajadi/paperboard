const { Signale } = require('signale')
const chalk = require('chalk')
const dayjs = require('dayjs')

const options = {
    types: {
        debug: {
            color: 'blue'
        },
    }
};

const signale = new Signale(options);
signale.config({
    displayLabel: false,
});

const { warn, success, error, star, note, log } = signale
const { gray, bold } = chalk

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
    const data = { prefix: gray(bookmark.id), message: bookmark.title, suffix: gray(tags) }
    if (bookmark.star) {
        star(data)
    } else {
        note(data)
    }
}

const logBookmark = (bookmark) => {
    const createdAt = getCreatedAt(bookmark)
    const data = { prefix: gray(bookmark.id), message: bookmark.title, suffix: gray(createdAt) }
    if (bookmark.star) {
        star(data)
    } else {
        note(data)
    }
}

const displayBookmarks = (bookmarks) => {
    bookmarks.map(bookmark => {
        logBookmarkWithTag(bookmark)
    })
}

const displayBookmarksByTag = (bookmarks, tags) => {
    tags.map(tag => {
        const filteredBookmarks = bookmarks.filter(bookmark => {
            const bookmarkTags = bookmark.tags.map(tag => tag.name)
            return bookmarkTags.includes(tag.name)
        })
        if (filteredBookmarks.length) {
            log({ message: bold(`@${tag.name}`) })
            filteredBookmarks.forEach(bookmark => {
                logBookmark(bookmark)
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
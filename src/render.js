const { Signale } = require('signale')
const chalk = require('chalk')

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

const { warn, success, error, star, note } = signale
const { gray, blue } = chalk

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

const logBookmark = (bookmark) => {
    const tags = getTags(bookmark)
    const data = { prefix: gray(bookmark.id), message: bookmark.title, suffix: gray(tags) }
    if (bookmark.star) {
        star(data)
    } else {
        note(data)
    }
}

const displayBookmarks = (bookmarks) => {
    bookmarks.map(bookmark => {
        logBookmark(bookmark)
    })
}

module.exports = {
    warn,
    success,
    error,
    displayBookmarks
}
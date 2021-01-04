const signale = require('signale');
const moment = require('moment');

const {
  gray, underline, cyan, red, green,
} = require('chalk');

signale.config({ displayLabel: false });

const { log, star } = signale;

const TAB = ' '.repeat(4);

function getTags(tags) {
  let res = '';
  if (tags) {
    tags.forEach((tag) => {
      res += cyan(`@${tag.name} `);
    });
  }

  return res;
}

function getId(id) {
  const prefix = [];

  prefix.push(' '.repeat(2 - String(id).length));
  prefix.push(gray(`${id}.`));

  return prefix.join(' ');
}

function getGroupTitle(title) {
  return underline(gray(title));
}

function getFromNow(date) {
  return gray(moment(date).fromNow());
}

function getHostname(hostname) {
  return underline(gray(hostname));
}

function displayEmpty() {
  log('No Data');
}

function displayError(message = 'Unexpected Error') {
  log(red(message));
}

function displaySuccess(message) {
  log(green(message));
}

function displayBookmarks(bookmarks) {
  const groups = Object.keys(bookmarks);

  if (groups.length) {
    groups.forEach((group) => {
      log({ prefix: TAB, message: getGroupTitle(group) });
      bookmarks[group].forEach((bookmark) => {
        const bookmarkObj = {
          prefix: getId(bookmark.id),
          message: bookmark.title,
          suffix: getTags(bookmark.tags),
        };

        if (bookmark.star) {
          star(bookmarkObj);
        } else {
          log(bookmarkObj);
        }
      });
    });
  } else {
    displayEmpty();
  }
}

function getBookmarkObject(bookmark) {
  return {
    prefix: getId(bookmark.id),
    message: bookmark.title,
    suffix: getFromNow(bookmark.createdAt),
  };
}

function displayBookmark(bookmark) {
  const bookmarkObj = getBookmarkObject(bookmark);
  if (bookmark.star) {
    star(bookmarkObj);
  } else {
    log(bookmarkObj);
  }

  if (bookmark.tags.length) {
    log({
      prefix: TAB,
      message: getTags(bookmark.tags),
    });
  }

  log({
    prefix: TAB,
    message: getHostname(bookmark.hostname),
  });
  log({ prefix: TAB, message: bookmark.excerpt });
}

module.exports = {
  displayBookmarks,
  displayBookmark,
  displayError,
  displaySuccess,
};

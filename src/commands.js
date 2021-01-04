const fs = require('fs');
const os = require('os');
const ora = require('ora');
const ejs = require('ejs');
const md5 = require('md5');
const open = require('open');
const path = require('path');
const moment = require('moment');
const { groupBy } = require('lodash');
const render = require('./render');
const { BookmarkService } = require('./services');

const downloadSpiner = ora('Downloading...');
const createSpiner = ora('Creating Bookmark File...');

function groupByDate(bookmarks) {
  return groupBy(bookmarks, (b) => moment(b.createdAt).format('MMM Do YYYY'));
}

function getAppDir() {
  const appDirectory = path.join(os.homedir(), '.korgin');

  if (!fs.existsSync(appDirectory)) {
    fs.mkdirSync(appDirectory);
  }

  return appDirectory;
}

async function createBookmarkFile(bookmark) {
  const templatePath = path.join(__dirname, '..', 'assets', 'template.ejs');
  const stylePath = path.join(__dirname, '..', 'assets', 'mithqal.css');

  const template = await fs.readFileSync(templatePath, 'utf8');

  const data = ejs.render(template, {
    title: bookmark.title,
    content: bookmark.content,
    excerpt: bookmark.excerpt,
    href: bookmark.href,
    hostname: bookmark.hostname,
    stylePath,
  });

  const bookmarkFileName = `${md5(bookmark.title)}.html`;
  const appDir = getAppDir();
  const bookmarkFilePath = path.join(appDir, bookmarkFileName);

  if (!fs.existsSync(bookmarkFilePath)) {
    await fs.writeFileSync(bookmarkFilePath, data);
  }

  return bookmarkFilePath;
}

async function listBookmarks(args) {
  try {
    const { archive, star } = args;

    const options = {
      archive: false,
    };

    if (archive) {
      options.archive = archive;
    }

    if (star) {
      options.star = star;
    }

    const bookmarks = await BookmarkService.getBookmarks(options);

    const groupedByDate = groupByDate(bookmarks);

    render.displayBookmarks(groupedByDate);
  } catch (error) {
    render.displayError();
  }
}

async function showBookmark(id) {
  try {
    const bookmark = await BookmarkService.getBookmark(id);
    render.displayBookmark(bookmark);
  } catch (error) {
    console.log(error);
    switch (error.message) {
      case 'Bookmark not found':
        render.displayError(error.message);
        break;
      default:
        render.displayError();
    }
  }
}

async function addBookmark(url, tags) {
  try {
    downloadSpiner.start();

    const bookmark = await BookmarkService.createBookmark(url);
    await BookmarkService.addTags(bookmark.id, tags);
    downloadSpiner.stop();
    render.displaySuccess('Bookmark added successfully');
  } catch (error) {
    downloadSpiner.stop();
    render.displayError();
  }
}

async function deleteBookmark(id) {
  try {
    await BookmarkService.destroyBookmark(id);
    render.displaySuccess('Bookmark deleted successfully');
  } catch (error) {
    render.displayError();
  }
}

async function starBookmark(id) {
  try {
    const bookmark = await BookmarkService.getBookmark(id);

    await BookmarkService.updateBookmark(bookmark.id, {
      star: !bookmark.star,
    });

    render.displaySuccess(
      `Bookmark ${bookmark.star ? 'unstarred' : 'starred'} successfully`,
    );
  } catch (error) {
    switch (error.message) {
      case 'Bookmark not found':
        render.displayError(error.message);
        break;
      default:
        render.displayError();
    }
  }
}

async function archiveBookmark(id) {
  try {
    const bookmark = await BookmarkService.getBookmark(id);

    await BookmarkService.updateBookmark(bookmark.id, {
      archive: !bookmark.archive,
    });

    render.displaySuccess(
      `Bookmark ${bookmark.archive ? 'restore' : 'archived'} successfully`,
    );
  } catch (error) {
    switch (error.message) {
      case 'Bookmark not found':
        render.displayError(error.message);
        break;
      default:
        render.displayError();
    }
  }
}

async function setTags(id, tags) {
  try {
    await BookmarkService.addTags(id, tags);
    render.displaySuccess('Tags set successfully');
  } catch (error) {
    switch (error.message) {
      case 'Bookmark not found':
        render.displayError(error.message);
        break;
      default:
        render.displayError();
    }
  }
}

async function openBookmark(id) {
  try {
    const { href } = await BookmarkService.getBookmark(id);
    await open(href);
  } catch (error) {
    switch (error.message) {
      case 'Bookmark not found':
        render.displayError(error.message);
        break;
      default:
        render.displayError();
    }
  }
}

async function readBookmark(id) {
  try {
    const bookmark = await BookmarkService.getBookmark(id);
    createSpiner.start();
    const filePath = await createBookmarkFile(bookmark);
    await open(filePath);
    createSpiner.stop();
  } catch (error) {
    createSpiner.stop();
    switch (error.message) {
      case 'Bookmark not found':
        render.displayError(error.message);
        break;
      default:
        render.displayError();
    }
  }
}

module.exports = {
  listBookmarks,
  showBookmark,
  addBookmark,
  deleteBookmark,
  starBookmark,
  archiveBookmark,
  setTags,
  openBookmark,
  readBookmark,
};

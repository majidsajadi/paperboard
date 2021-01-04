const axios = require('axios');
const { JSDOM } = require('jsdom');
const { Readability } = require('@mozilla/readability');
const URL = require('url');
const { Tag, Bookmark } = require('../models');
const { findOrCreateTags } = require('./tag.service');

async function downloadBookmark(href) {
  const res = await axios({
    method: 'get',
    url: href,
  });
  return res.data;
}

function parseBookmark(raw) {
  const doc = new JSDOM(raw);
  const reader = new Readability(doc.window.document);

  const parsed = reader.parse();
  return parsed;
}

function parseUrl(str) {
  const parsed = URL.parse(str);

  const { href, hostname } = parsed;

  if (!href || !hostname) {
    throw new Error('URL is not valid');
  }

  return {
    href,
    hostname,
  };
}

function getBookmarks(options) {
  return Bookmark.findAll({
    where: options,
    order: [['createdAt', 'DESC']],
    attributes: [
      'id',
      'href',
      'hostname',
      'title',
      'star',
      'archive',
      'createdAt',
      'excerpt',
    ],
    include: [
      {
        model: Tag,
        attributes: ['id', 'name'],
        through: { attributes: [] },
      },
    ],
  });
}

async function getBookmark(id) {
  const bookmark = await Bookmark.findByPk(id, {
    attributes: [
      'id',
      'href',
      'hostname',
      'title',
      'star',
      'archive',
      'createdAt',
      'excerpt',
      'content',
    ],
    include: [
      {
        model: Tag,
        attributes: ['id', 'name'],
        through: { attributes: [] },
      },
    ],
  });

  if (!bookmark) {
    throw new Error('Bookmark not found');
  }

  return bookmark;
}

function getBookmarkByHref(href) {
  return Bookmark.findOne({
    where: {
      href,
    },
    attributes: [
      'id',
      'href',
      'hostname',
      'title',
      'star',
      'archive',
      'createdAt',
      'excerpt',
      'content',
    ],
    include: [
      {
        model: Tag,
        attributes: ['id', 'name'],
        through: { attributes: [] },
      },
    ],
  });
}

async function updateBookmark(id, data) {
  const bookmark = await getBookmark(id);

  if (Object.prototype.hasOwnProperty.call(data, 'archive')) {
    bookmark.archive = data.archive;
  }
  if (Object.prototype.hasOwnProperty.call(data, 'star')) {
    bookmark.star = data.star;
  }

  await bookmark.save();

  return bookmark;
}

function destroyBookmark(id) {
  return Bookmark.destroy({
    where: {
      id,
    },
  });
}

async function createBookmark(url) {
  const parsedUrl = parseUrl(url);

  const bookmark = await getBookmarkByHref(parsedUrl.href);
  if (bookmark) {
    return bookmark;
  }

  const rawBookmark = await downloadBookmark(parsedUrl.href);

  const parsedBookmark = parseBookmark(rawBookmark);

  const storedBookmark = await Bookmark.create({
    href: parsedUrl.href,
    hostname: parsedUrl.hostname,
    title: parsedBookmark.title,
    excerpt: parsedBookmark.excerpt,
    content: parsedBookmark.content,
  });

  return storedBookmark;
}

async function addTags(id, tags) {
  const storedBookmark = await getBookmark(id);

  const storedTags = await findOrCreateTags(tags);

  await storedBookmark.setTags(storedTags);

  return storedBookmark;
}

module.exports = {
  createBookmark,
  destroyBookmark,
  updateBookmark,
  getBookmark,
  getBookmarks,
  addTags,
};

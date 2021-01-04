const joi = require('joi');
const { BookmarkService } = require('../services');

async function getBookmarks(req, res, next) {
  try {
    const schema = joi.object({
      archive: joi.any().valid('1', '0').optional(),
      star: joi.any().valid('1', '0').optional(),
    });
    const { error } = schema.validate(req.query);
    if (error) {
      throw error;
    }

    const { archive, star } = req.query;

    const options = {
      archive: false,
    };

    if (archive) {
      options.archive = archive === '1';
    }

    if (star) {
      options.star = star === '1';
    }

    const bookmarks = await BookmarkService.getBookmarks(options);

    res.json(bookmarks);
  } catch (error) {
    next(error);
  }
}

async function getBookmark(req, res, next) {
  try {
    const { id } = req.params;
    const bookmark = await BookmarkService.getBookmark(id);
    res.json(bookmark);
  } catch (error) {
    next(error);
  }
}

async function destroyBookmark(req, res, next) {
  try {
    const { id } = req.params;
    await BookmarkService.destroyBookmark(id);
    res.json({ message: 'Bookmark destroyed successfully' });
  } catch (error) {
    next(error);
  }
}

async function updateBookmark(req, res, next) {
  try {
    const schema = joi.object({
      archive: joi.boolean().optional(),
      star: joi.boolean().optional(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      throw error;
    }

    const { id } = req.params;

    const updated = await BookmarkService.updateBookmark(id, req.body);

    res.json(updated);
  } catch (error) {
    next(error);
  }
}

async function createBookmark(req, res, next) {
  try {
    const schema = joi.object({
      url: joi.string().uri().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      throw error;
    }

    const { url } = req.body;

    const bookmark = await BookmarkService.createBookmark(url);

    res.json(bookmark);
  } catch (error) {
    next(error);
  }
}

async function setTags(req, res, next) {
  try {
    const schema = joi.object({
      tags: joi.array().items(joi.string()).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      throw error;
    }

    const { tags } = req.body;
    const { id } = req.params;

    await BookmarkService.addTags(id, tags);

    res.json({ message: 'Tags added successfully' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createBookmark,
  destroyBookmark,
  updateBookmark,
  getBookmark,
  getBookmarks,
  setTags,
};

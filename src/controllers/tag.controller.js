const joi = require('joi');
const { TagService } = require('../services');

async function getTags(req, res, next) {
  try {
    const tags = await TagService.getTags();
    res.json(tags);
  } catch (error) {
    next(error);
  }
}

async function getTag(req, res, next) {
  try {
    const { id } = req.params;
    const tag = await TagService.getTag(id);
    res.json(tag);
  } catch (error) {
    next(error);
  }
}

async function updateTag(req, res, next) {
  try {
    const schema = joi.object({
      name: joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      throw error;
    }

    const { id } = req.params;
    const updated = await TagService.updateTag(id, req.body);

    res.json(updated);
  } catch (error) {
    next(error);
  }
}

async function destroyTag(req, res, next) {
  try {
    const { id } = req.params;
    await TagService.destroyTag(id);
    res.json({ message: 'Tag destroyed successfully' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getTag,
  getTags,
  updateTag,
  destroyTag,
};

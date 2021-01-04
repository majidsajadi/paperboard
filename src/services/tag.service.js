const { Tag, Bookmark } = require('../models');

function parseTags(tags) {
  return tags.map((name) => ({ name }));
}

function getTags() {
  return Tag.findAll({
    attributes: ['id', 'name'],
    include: [
      {
        model: Bookmark,
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
        where: {
          archive: false,
        },
        through: { attributes: [] },
      },
    ],
  });
}

function getTag(id) {
  return Tag.findByPk(id, {
    include: [
      {
        model: Bookmark,
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
        where: {
          archive: false,
        },
        through: { attributes: [] },
      },
    ],
  });
}

async function updateTag(id, data) {
  const tag = await getTag(id);
  if (!tag) {
    throw new Error('Tag not found');
  }

  tag.name = data.name;
  await tag.save();

  return tag;
}

function destroyTag(id) {
  return Tag.destroy({
    where: {
      id,
    },
  });
}

async function findOrCreateTags(tags) {
  const parsedtags = parseTags(tags);

  await Tag.bulkCreate(parsedtags, { updateOnDuplicate: ['name'] });

  const storedTags = await Tag.findAll({
    where: {
      name: tags,
    },
  });

  return storedTags;
}

module.exports = {
  getTag,
  getTags,
  updateTag,
  destroyTag,
  findOrCreateTags,
};

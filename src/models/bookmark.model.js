module.exports = (sequelize, DataTypes) => {
  const Bookmark = sequelize.define('bookmark', {
    href: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    hostname: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.TEXT,
    },
    excerpt: {
      type: DataTypes.TEXT,
    },
    star: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    archive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  return Bookmark;
};

module.exports = (sequelize, DataTypes) => {
  const Favourites = sequelize.define('Favourites', {
    email: DataTypes.STRING,
    article: DataTypes.STRING
  });

  return Favourites;
};

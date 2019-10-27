module.exports = (sequelize, DataTypes) => {
  const RegisteredUsers = sequelize.define('RegisteredUsers', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  });

  return RegisteredUsers;
};

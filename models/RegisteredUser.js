module.exports = (sequelize, DataTypes) => {
  const RegisteredUsers = sequelize.define('RegisteredUsers', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    history: {
      type: DataTypes.STRING(7000),
      allowNull: true,
      defaultValue: null,
      get() {
        var history = this.getDataValue('history');
        if (history != null) {
          if (String(history).includes(';')) {
            return history.split(';');
          } else {
            return [history];
          }
        }
      },
      set(val) {
        if (Array.isArray(val)) {
          this.setDataValue('history', val.join(';'));
        } else {
          this.setDataValue('history', val);
        }
      }
    },
    favorites: {
      type: DataTypes.STRING(7000),
      allowNull: true,
      defaultValue: null,
      get() {
        if (this.getDataValue('favorites') != null) {
          return this.getDataValue('favorites').split(';');
        }
      },
      set(val) {
        if (Array.isArray(val)) {
          this.setDataValue('favorites', val.join(';'));
        } else {
          this.setDataValue('favorites', val);
        }
      }
    }
  });

  return RegisteredUsers;
};

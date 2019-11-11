const bunyan = require('bunyan');
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;
const appname = 'Group_07';

module.exports = {
  applicationName: appname,
  logger: bunyan.createLogger({ name: appname }),
  mysql: {
    options: {
      host: '172.17.0.1',
      port: 3306,
      database: 'Group07',
      dialect: 'mysql',
      username: 'root',
      password: 'mypassword',
      operatorsAliases: false,
      hooks: {
        beforeCreate: user => {
          console.log(user);
          // only hash the password if it has been modified (or is new)

          //Need to include and equivalent check for modified
          // if (!user.dataValues.isModified('password')) return next();

          // generate a salt
          return bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
            if (err) console.log(err);
            // hash the password using our new salt
            return bcrypt.hash(user.password, salt, (hasherr, hash) => {
              if (hasherr) console.log(err);
              // override the cleartext password with the hashed one
              user.password = hash;
              console.log(user.password);
              user.save();
            });
          });
        }
      }
    }
  }
};

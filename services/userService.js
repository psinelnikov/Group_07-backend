const Models = require('../models');
const bcrypt = require('bcrypt');

let client = null;
let models = null;

// Find all users
async function getAll() {
  models.RegisteredUsers.findAll().then(users => {
    console.log('All users:', JSON.stringify(users, null, 4));
  });
}

async function getOne() {
  models.RegisteredUsers.findAll({
    limit: 1
  }).then(user => {
    console.log('One user:', user.username);
  });
}

// Create a new user
async function createUser(username, email, password) {
  // Note: using `force: true` will drop the table if it already exists
  models.RegisteredUsers.sync().then(() => {
    // Now the `users` table in the database corresponds to the model definition
    // TODO: Check if
    return models.RegisteredUsers.create({
      username: username,
      email: email,
      password: password
    });
  });
}

// Delete everyone named "Jane"
async function deleteUser() {
  models.RegisteredUsers.destroy({
    where: {
      firstName: 'Jane'
    }
  }).then(() => {
    console.log('Done');
  });
}

// Change everyone without a last name to "Doe"
async function updateUser() {
  models.RegisteredUsers.update(
    { lastName: 'Doe' },
    {
      where: {
        lastName: null
      }
    }
  ).then(() => {
    console.log('Done');
  });
}

async function authenticate(username, plainTextPassword) {
  let user = await models.RegisteredUsers.findAll({
    limit: 1,
    where: {
      username: username
    }
  });

  if (user.length > 0) {
    return await bcrypt.compare(plainTextPassword, user[0].password);
  } else {
    return false;
  }
}

module.exports = _client => {
  models = Models(_client);
  client = _client;

  return {
    getAll,
    getOne,
    createUser,
    deleteUser,
    updateUser,
    authenticate
  };
};

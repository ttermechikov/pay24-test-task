const fs = require('fs');
const { join } = require('path');
const { Sequelize } = require('sequelize');

const { createAdmin, isAdminExists } = require('./scripts');

// Passing a connection data
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: join(__dirname, 'db.sqlite3'),
  logging: false,
});

// Testing the connection
try {
  (async () => {
    await sequelize.authenticate();
    console.log(
      'Connection to the database has been established successfully.'
    );
  })();
} catch (error) {
  console.error('Unable to connect to the database:', error);
  process.exit(1);
}

// Setting up models
const db = {
  models: {},
};
fs.readdirSync(__dirname)
  .filter((file) => /\.(model)\.(js)$/.test(file))
  .forEach((file) => {
    const model = require(join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db.models[model.name] = model;
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Create the admin
isAdminExists(db).then((isExists) => {
  if (!isExists) createAdmin(db);
});

module.exports = db;

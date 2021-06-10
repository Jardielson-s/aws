const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const config = require('../config/config');

const db = {};
const sequelize = new Sequelize(config);

fs
.readdirSync(__dirname)
.filter(file => {
  return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
})
.forEach(file => {
  const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

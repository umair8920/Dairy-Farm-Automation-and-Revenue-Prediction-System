const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('dairyland', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const finances = sequelize.define('finances', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

  amount: { type: DataTypes.FLOAT },
  cost: { type: DataTypes.FLOAT },
  date: { type: DataTypes.DATEONLY, allowNull: false },
});

module.exports = { finances };

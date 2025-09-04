const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Users = require('./Users');
const Cart = require('./Cart');

const models = {
  Users,
  Cart,
  sequelize,
};

sequelize.sync({ force: false }).then(() => {
  console.log('Models synced with database');
}).catch(err => {
  console.error('Error syncing database:', err);
});

module.exports = models;
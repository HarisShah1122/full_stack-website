const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./Users');
const Cart = require('./Cart');
const Order = require('./Order');

const models = {
  User,
  Cart,
  Order,
  sequelize,
};

const syncDatabase = async () => {
  try {
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await User.sync({ force: false });
    await Cart.sync({ force: false });
    await Order.sync({ force: false });
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    console.log('Models synced with database');
  } catch (err) {
    console.error('Error syncing database:', err);
  }
};

syncDatabase();

module.exports = models;
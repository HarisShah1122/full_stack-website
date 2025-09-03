const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Users = require('./Users');

const models = {
    Users,
    sequelize,
};

sequelize.sync({ force: false }).then(() => {
    console.log('Models synced with database');
  }).catch(err => {
    console.error('Error syncing database:', err);
  });


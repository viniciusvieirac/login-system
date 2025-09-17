const { Sequelize } = require('sequelize');
const dbConfig = require('../config/config')[process.env.NODE_ENV || 'development'];
const User = require('../models/User');

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  define: dbConfig.define,
  logging: false,
});

User.init(sequelize);

module.exports = sequelize;

const { Sequelize } = require('sequelize');
const dbConfig = require('../config/config').development;
const User = require('../database/models/User');

const connection = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    define: dbConfig.define,
  }
);

User.init(connection);

module.exports = connection;

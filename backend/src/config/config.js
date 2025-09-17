require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'password',
    database: process.env.DB_NAME || 'user_login',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql',
    define: {
      timestamps: true,
      underscored: true,
    },
  },
};

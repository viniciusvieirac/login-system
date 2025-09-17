const User = require('../database/models/User');

const createUser = ({ name, email, password }) => User.create({ name, email, password });
const getUsers = () => User.findAll({ attributes: { exclude: ['password'] } });
const getByemail = (email) => User.findOne({ where: { email } });
const getByUserId = (userId) => User.findByPk(userId, { attributes: { exclude: ['password'] } });

module.exports = {
  createUser,
  getUsers,
  getByemail,
  getByUserId,
};
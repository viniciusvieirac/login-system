const User = require('../models/User');

const createUser = () => console.log('criou');

const getUsers = () => console.log('pegou');

const getByemail = () => console.log('pegou pelo email');

const getByUserId = () => console.log('pegou pelo id');

module.exports = {
  createUser,
  getUsers,
  getByemail,
  getByUserId,
};
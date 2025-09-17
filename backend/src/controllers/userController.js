const User = require('../database/models/User');

module.exports = {
  async getUser(req, res) {
    console.log('pegou');
  },

  async create(req, res) {
    console.log('criou');
  },

  async login() {
    console.log('logou');
  }
};


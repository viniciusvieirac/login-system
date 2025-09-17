const User = require('../database/models/User');

module.exports = {
  async getAll(req, res) {
    console.log('pegou');
  },

  async create(req, res) {
    console.log('criou');
  },

  async login() {
    console.log('logou');
  }
};


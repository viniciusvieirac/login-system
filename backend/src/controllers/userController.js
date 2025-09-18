const User = require('../database/models/User');
const UserService = require('../service/userService');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/token');

module.exports = {
  async getUser(req, res) {
    try {
      const user = await UserService.getByUserId(req.userId);
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      return res.json({ user });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao obter usuário', error: error.message });
    }
  },

  async create(req, res) {
    try {
      const { name, email, password } = req.body;
      const user = await UserService.createUser({ name, email, password });
      const token = generateToken({ id: user.id });

      return res.status(201).json({
        status: 'success',
        message: 'Usuário criado com sucesso',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          password: undefined,
        },
        token,
      });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao criar usuário', error: error.message });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await UserService.getByemail(email);
      if (!user) {
        return res.status(400).json({ status: 0, message: 'Email não cadastrado, cadastre-se!' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ status: 0, message: 'E-mail ou senha incorreto!' });
      }

      const token = generateToken({ id: user.id });
      user.password = undefined;

      return res.status(200).json({
        status: 1,
        message: 'Login realizado com sucesso',
        user,
        token,
      });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao fazer login', error: error.message });
    }
  },

  async getUserByEmail(email) {
    const user = await User.findOne({ where: { email } });
    return user;
  }
};


const userController = require("../controllers/userController");

const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

const validateUser = (req, res, next) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ message: '"Nome" e "Senha" Precisam ser preenchidos' });
  }
  if (name.length < 8) {
    return res.status(400).json({ message: '"Nome" Precisa ter pelo menos 8 caracteres' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: '"Senha" Precisa ter pelo menos 6 caracteres ' });
  }

  next();
};

const validateEmail = async (req, res, next) => {
  const { email } = req.body;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: '"Email" Deve ser um email válido.' });
  }
  const user = await userController.getUserByEmail(email);
  if (user) {
    return res.status(409).json({ message: 'Usuário já cadastrado' });
  }
  next();
};

module.exports = { validateUser, validateEmail };

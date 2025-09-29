const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function register(req, res) {
  const { username, password } = req.body;

  if (!username || !password || password.length < 4) {
    return res.status(400).json({ message: 'Dados inválidos' });
  }

  const exists = await prisma.users.findUnique({ where: { username } });
  if (exists) {
    return res.status(400).json({ message: 'Usuário já existe' });
  }

  // Se for o primeiro usuário, ele é admin automaticamente
  const count = await prisma.users.count();
  const isAdmin = count === 0;

  const user = await prisma.users.create({
    data: { username, password, isAdmin }
  });

  res.json({ message: 'Usuário registrado com sucesso', userId: user.id });
}

module.exports = { register };

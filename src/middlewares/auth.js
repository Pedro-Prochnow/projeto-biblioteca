const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return res.status(401).json({ message: 'Credenciais ausentes' });
  }

  const base64 = authHeader.split(' ')[1];
  const decoded = Buffer.from(base64, 'base64').toString('utf-8');
  const [username, password] = decoded.split(':');

  const user = await prisma.users.findUnique({ where: { username } });

  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Usuário ou senha inválidos' });
  }

  req.user = user;
  next();
};

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Listar todos
async function getAll(req, res) {
  const books = await prisma.books.findMany();
  res.json(books);
}

// Buscar por ID
async function getById(req, res) {
  const { id } = req.params;
  const book = await prisma.books.findUnique({ where: { id: Number(id) } });
  if (!book) return res.status(404).json({ message: 'Livro não encontrado' });
  res.json(book);
}

// Criar livro (admin)
async function create(req, res) {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ message: 'Título e autor são obrigatórios' });
  }
  const book = await prisma.books.create({ data: { title, author } });
  res.json({ message: 'Livro criado', book });
}

// Atualizar livro (admin)
async function update(req, res) {
  const { id } = req.params;
  const data = req.body;
  try {
    const book = await prisma.books.update({
      where: { id: Number(id) },
      data
    });
    res.json({ message: 'Livro atualizado', book });
  } catch {
    res.status(404).json({ message: 'Livro não encontrado' });
  }
}

// Deletar livro (admin)
async function remove(req, res) {
  const { id } = req.params;
  try {
    await prisma.books.delete({ where: { id: Number(id) } });
    res.json({ message: 'Livro removido' });
  } catch {
    res.status(404).json({ message: 'Livro não encontrado' });
  }
}

// Emprestar livro
async function borrow(req, res) {
  const { id } = req.params;
  const book = await prisma.books.findUnique({ where: { id: Number(id) } });

  if (!book) return res.status(404).json({ message: 'Livro não encontrado' });
  if (!book.available) {
    return res.status(400).json({ message: 'Livro indisponível' });
  }

  await prisma.books.update({
    where: { id: Number(id) },
    data: { available: false }
  });

  res.json({ message: 'Livro emprestado com sucesso' });
}

// Devolver livro
async function returnBook(req, res) {
  const { id } = req.params;
  const book = await prisma.books.findUnique({ where: { id: Number(id) } });

  if (!book) return res.status(404).json({ message: 'Livro não encontrado' });
  if (book.available) {
    return res.status(400).json({ message: 'Livro já está disponível' });
  }

  await prisma.books.update({
    where: { id: Number(id) },
    data: { available: true }
  });

  res.json({ message: 'Livro devolvido com sucesso' });
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  borrow,
  returnBook
};

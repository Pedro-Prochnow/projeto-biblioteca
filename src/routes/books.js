const express = require('express');
const router = express.Router();
const adminMiddleware = require('../middleware/admin');
const Book = require('../models/Book'); // Ajusta conforme seu modelo

// Listar todos os livros
router.get('/', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// Criar novo livro (somente admin)
router.post('/', adminMiddleware, async (req, res) => {
  const newBook = new Book(req.body);
  await newBook.save();
  res.status(201).json(newBook);
});

module.exports = router;

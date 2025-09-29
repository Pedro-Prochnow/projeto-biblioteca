const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');

app.use(express.json());

// Rotas
app.use('/auth', authRoutes);
app.use('/books', bookRoutes);

// Rota padrão
app.get('/', (req, res) => {
  res.send('API Biblioteca funcionando 🚀');
});

// Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

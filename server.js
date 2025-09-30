import express from 'express';
import bodyParser from 'body-parser';

import authRoutes from './src/routes/auth.js';
import bookRoutes from './src/routes/books.js';


const app = express();
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/books', bookRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

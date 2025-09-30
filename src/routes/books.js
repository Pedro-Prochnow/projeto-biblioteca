import express from 'express';
import { listarLivros, criarLivro, emprestarLivro, devolverLivro } from '../controller/book.js';
import { authMiddleware } from '../middlewares/auth.js';
import { adminMiddleware } from '../middlewares/admin.js';

const router = express.Router();

router.get('/', authMiddleware, listarLivros);
router.post('/', authMiddleware, adminMiddleware, criarLivro);
router.post('/:id/emprestar', authMiddleware, emprestarLivro);
router.post('/:id/devolver', authMiddleware, devolverLivro);

export default router;

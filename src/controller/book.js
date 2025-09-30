import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const listarLivros = async (req, res) => {
    try {
        const livros = await prisma.livro.findMany();
        res.json(livros);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao listar livros' });
    }
};

export const criarLivro = async (req, res) => {
    const { titulo, autor, ano } = req.body;
    if (!titulo || !autor || !ano) return res.status(400).json({ error: 'Todos os campos são obrigatórios' });

    try {
        const livro = await prisma.livro.create({ data: { titulo, autor, ano } });
        res.status(201).json(livro);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao criar livro' });
    }
};

export const emprestarLivro = async (req, res) => {
    const livroId = parseInt(req.params.id);
    const usuarioId = req.user.id;

    try {
        const livro = await prisma.livro.findUnique({ where: { id: livroId } });
        if (!livro) return res.status(404).json({ error: 'Livro não encontrado' });
        if (livro.emprestado) return res.status(400).json({ error: 'Livro já emprestado' });

        await prisma.livro.update({ where: { id: livroId }, data: { emprestado: true, usuarioId } });
        res.json({ message: 'Livro emprestado com sucesso' });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao emprestar livro' });
    }
};

export const devolverLivro = async (req, res) => {
    const livroId = parseInt(req.params.id);

    try {
        const livro = await prisma.livro.findUnique({ where: { id: livroId } });
        if (!livro) return res.status(404).json({ error: 'Livro não encontrado' });
        if (!livro.emprestado) return res.status(400).json({ error: 'Livro não está emprestado' });

        await prisma.livro.update({ where: { id: livroId }, data: { emprestado: false, usuarioId: null } });
        res.json({ message: 'Livro devolvido com sucesso' });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao devolver livro' });
    }
};

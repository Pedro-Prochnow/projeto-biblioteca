import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const JWT_SECRET = 'seusegredoaqui';

export const register = async (req, res) => {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) return res.status(400).json({ error: 'Todos os campos são obrigatórios' });

    try {
        const userExists = await prisma.usuario.findUnique({ where: { email } });
        if (userExists) return res.status(400).json({ error: 'Usuário já existe' });

        const hashedPassword = await bcrypt.hash(senha, 10);
        const usuario = await prisma.usuario.create({
            data: { nome, email, senha: hashedPassword, isAdmin: false }
        });

        res.status(201).json({ usuario });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao registrar usuário' });
    }
};

export const login = async (req, res) => {
    const { email, senha } = req.body;
    if (!email || !senha) return res.status(400).json({ error: 'Email e senha obrigatórios' });

    try {
        const usuario = await prisma.usuario.findUnique({ where: { email } });
        if (!usuario) return res.status(400).json({ error: 'Usuário não encontrado' });

        const valid = await bcrypt.compare(senha, usuario.senha);
        if (!valid) return res.status(400).json({ error: 'Senha incorreta' });

        const token = jwt.sign({ id: usuario.id, isAdmin: usuario.isAdmin }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
};

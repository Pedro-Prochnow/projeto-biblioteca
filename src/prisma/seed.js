import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando carga de dados...');

  // REMOVA estas linhas (causam erro se tabelas não existem):
  // await prisma.book.deleteMany();
  // await prisma.user.deleteMany();

  // Criar administradores
const admin1 = await prisma.user.create({
  data: { nome: 'gerente', email: 'gerente@teste.com', senha: 'senha123', isAdmin: true }
});

const admin2 = await prisma.user.create({
  data: { nome: 'coordenador', email: 'coordenador@teste.com', senha: 'abcd1234', isAdmin: true }
});

const user1 = await prisma.user.create({
  data: { nome: 'estudante', email: 'estudante@teste.com', senha: 'minhasenha', isAdmin: false }
});

const user2 = await prisma.user.create({
  data: { nome: 'visitante', email: 'visitante@teste.com', senha: '12345678', isAdmin: false }
});

  // Adicionar livros diversos
  const livros = [
    { title: 'A Revolução dos Bichos', author: 'George Orwell', available: true },
    { title: 'O Pequeno Príncipe', author: 'Antoine de Saint-Exupéry', available: true },
    { title: 'Cem Anos de Solidão', author: 'Gabriel García Márquez', available: false },
    { title: 'O Hobbit', author: 'J.R.R. Tolkien', available: true },
    { title: '1984', author: 'George Orwell', available: true },
    { title: 'Dom Casmurro', author: 'Machado de Assis', available: false },
    { title: 'O Senhor dos Anéis', author: 'J.R.R. Tolkien', available: true },
    { title: 'Harry Potter e a Pedra Filosofal', author: 'J.K. Rowling', available: true }
  ];

  for (const livro of livros) {
    await prisma.book.create({ data: livro });
  }

  console.log('Dados carregados com sucesso!');
  console.log('Administradores: gerente/senha123, coordenador/abcd1234');
  console.log('Usuários: estudante/minhasenha, visitante/12345678');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
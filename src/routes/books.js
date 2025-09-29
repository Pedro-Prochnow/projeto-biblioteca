const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const bookCtrl = require('../controller/book');

// Rotas de livros
router.get('/', auth, bookCtrl.getAll);
router.get('/:id', auth, bookCtrl.getById);
router.post('/', auth, admin, bookCtrl.create);
router.patch('/:id', auth, admin, bookCtrl.update);
router.delete('/:id', auth, admin, bookCtrl.remove);
router.post('/:id/borrow', auth, bookCtrl.borrow);
router.post('/:id/return', auth, bookCtrl.returnBook);

module.exports = router;

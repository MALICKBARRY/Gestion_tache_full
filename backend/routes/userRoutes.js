const express = require('express');
const { getUsers, deleteUser, updateUserRole } = require('../controllers/userController');
const auth = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', auth, getUsers);
router.delete('/:id', auth, deleteUser);
router.put('/:id/role', auth, updateUserRole);

module.exports = router;
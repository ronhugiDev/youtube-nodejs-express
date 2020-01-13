const express = require('express');
const router = express.Router();

const {
    signup,
    login,
    getAllUsers,
    deleteUser
    
} = require('../controllers/users');

router.get('/', getAllUsers);
router.post('/signup', signup);
router.post('/login', login);
router.delete('/:userId', deleteUser);

module.exports = router;
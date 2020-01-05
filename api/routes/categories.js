const express = require('express');
const router = express.Router();

const {
    getAllCategories,
    getCategoryById,
    createNewCategory,
    updateOneCategory,
    deleteCategory

} = require('../controllers/categories.js');

router.get('/', getAllCategories);
router.get('/:categoryid', getCategoryById);
router.post('/', createNewCategory);
router.patch('/:categoryid', updateOneCategory);
router.delete('/:categoryid', deleteCategory);

module.exports = router;
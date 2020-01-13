const express = require('express');
const router = express.Router();

const upload = require('../middlewares/upload');
const checkAuth = require('../middlewares/checkAuth')

const {
    getAllArticles,
    getArticleById,
    createNewArticle,
    updateArticle,
    deleteArticle

} = require('../controllers/articles');

router.get('/', getAllArticles);
router.get('/:articleId', getArticleById);

router.post('/', checkAuth, upload.single('image'), createNewArticle);
router.patch('/:articleId', checkAuth, updateArticle);
router.delete('/:articleId', checkAuth, deleteArticle);

module.exports = router;
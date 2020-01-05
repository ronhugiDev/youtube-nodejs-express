const express = require('express');
const router = express.Router();

const upload = require('../middlewares/upload');

const {
    getAllArticles,
    getArticleById,
    createNewArticle,
    updateArticle,
    deleteArticle

} = require('../controllers/articles');

router.get('/', getAllArticles);
router.get('/:articleId',getArticleById);
router.post('/',upload.single('image') , createNewArticle);
router.patch('/:articleId', updateArticle);
router.delete('/:articleId', deleteArticle);

module.exports = router;
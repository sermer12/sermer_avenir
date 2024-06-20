const express = require('express');

const {
    editArticle,
    getArticles,
    setArticle,
    deleteArticle,
} = require('../controller/article.controller');
const router = express.Router();

router.post('/', setArticle);
router.get('/', getArticles);
router.put('/:id', editArticle);
router.delete("/:id", deleteArticle);
module.exports = router;
const express = require('express');

const {
    editArticle,
    getArticles,
    setArticle,
} = require('../controller/article.controller');
const router = express.Router();

router.post('/', setArticle);
router.get('/', getArticles);
router.put('/:id', editArticle);
// router.delete("/:id", deletePost);
module.exports = router;
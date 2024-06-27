const express = require('express');
const multer = require('multer');
const path = require('path');
const ArticlesModel = require('../model/article.model');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
            return cb(new Error('Seuls les fichiers PNG, JPG et JPEG sont autorisés'));
        }
        cb(null, true);
    },
});

module.exports.getArticles = async (req, res) => {
    try {
        const articles = await ArticlesModel.find();
        if (!articles || articles.length === 0) {
            return res.status(400).json({ message: 'Aucun article trouvé' });
        }
        return res.status(200).json(articles);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Une erreur s'est produite lors du chargement des articles.",
        });
    }
};

module.exports.setArticle = [
    upload.single('image'),
    async (req, res) => {
        try {
            const articleData = {
                title: req.body.title,
                content: req.body.content,
                image: req.file ? `/uploads/${req.file.filename}` : '',
                date: req.body.date,
            };

            const article = await ArticlesModel.create(articleData);

            res.status(200).json(article);
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message:
                    "Une erreur s'est produite lors de la création des articles.",
            });
        }
    }
];

module.exports.editArticle = async (req, res) => {
    try {
        const article = await ArticlesModel.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ message: 'Article non trouvé' });
        }
        const updatedArticle = await ArticlesModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedArticle);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Une erreur s'est produite lors de la mise à jour de l'article.",
        });
    }
};

module.exports.deleteArticle = async (req, res) => {
    try {
        const article = await ArticlesModel.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ message: 'Article non trouvé' });
        }
        await ArticlesModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Article supprimé' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Une erreur s'est produite lors de la suppression de l'article.",
        });
    }
};

const express = require('express');
const ArticlesModel = require('../model/article.model');

module.exports.getArticles = async (req, res) => {
    try {
        const articles = await ArticlesModel.find();
        if (!articles || articles.length === 0) {
            // Vérifier si aucun post n'est trouvé
            return res.status(400).json({ message: 'Aucun article trouvé' });
        }
        return res.status(200).json(articles);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Une erreur s'est produite lors du chargement des articles.",
        });
    }
}

module.exports.setArticle = async (req, res) => {
    try {
        const article = await ArticlesModel.create({
            title: req.body.title,
            content: req.body.content,
            image: req.body.image,
            date: req.body.date,
        });

        res.status(200).json(article);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message:
                "Une erreur s'est produite lors de la création des articles.",
        });
    }
};

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
}


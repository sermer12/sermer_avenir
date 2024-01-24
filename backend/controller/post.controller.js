const express = require("express");
const PostModel = require("../model/post.model");

module.exports.getPost = async (req, res) => {
  try {
    const posts = await PostModel.find();
    if (!posts) {
      return res.status(400).json({ message: "le post n'existe pas" });
    }
    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Une erreur s'est produite lors du chargement des posts.",
    });
  }
};

module.exports.setPost = async (req, res) => {
  try {
    if (
      !req.body.date ||
      !req.body.lieu ||
      !req.body.name ||
      !req.body.description
    ) {
      return res
        .status(400)
        .json({ message: "Merci de renseigner tous les champs" });
    }
    const post = await PostModel.create({
      date: req.body.date,
      lieu: req.body.lieu,
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
    });
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Une erreur s'est produite lors de la creation des posts.",
    });
  }
};
module.exports.editePost = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    if (!post) {
      return res.status(400).json({ message: "ce  post n'existe pas" });
    }
    const updatePost = await PostModel.findByIdAndUpdate(
      req.params.id, // Utilisez l'ID du document
      req.body,
      { new: true }
    );
    res.status(200).json(updatePost);
  } catch (error) {
    res.status(500).json({
      message: "une erreur s'est produit lors de la mise a jours des posts",
    });
  }
};

module.exports.deletePost = async (req, res) => {
  try {
    const postId = await PostModel.findById(req.params.id);
    if (!postId) {
      return res.status(400).json({ message: "ce post n'existe pas" });
    }
    await postId.deleteOne({ _id: req.params.id });
    res.status(200).json({
      message:
        "le poste " + "" + " " + req.params.id + " " + "a ete bien supprimer",
    });
  } catch (error) {
    res.status(500).json({
      message: "une erreur s'est produit lors de la suppresion" + error,
    });
  }
};

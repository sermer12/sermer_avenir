const express = require("express");
const PostModel = require("../model/post.model");
const multer = require("multer");

module.exports.getPost = async (req, res) => {
  try {
    const posts = await PostModel.find();
    if (!posts || posts.length === 0) {
      // Vérifier si aucun post n'est trouvé
      return res.status(400).json({ message: "Aucun post trouvé" });
    }
    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Une erreur s'est produite lors du chargement des posts.",
    });
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/posts/pdf");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports.setPost = [
  upload.single("file"),
  async (req, res) => {
    try {
      // Définir le chemin du document PDF correctement
      const fileName = req.file.filename;
      console.log("filee", req.file);

      const post = await PostModel.create({
        date: req.body.date,
        place: req.body.place,
        name: req.body.name,
        description: req.body.description,
        document_pdf: fileName,
        heure: req.body.heure,
      });

      res.status(200).json(post);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Une erreur s'est produite lors de la création des posts.",
      });
    }
  },
];

module.exports.editePost = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    if (!post) {
      return res.status(400).json({ message: "Ce post n'existe pas" });
    }

    const updatePost = await PostModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatePost);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Une erreur s'est produite lors de la mise à jour du post",
    });
  }
};

module.exports.deletePost = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    if (!post) {
      return res.status(400).json({ message: "Ce post n'existe pas" });
    }

    await post.remove();

    res.status(200).json({
      message: "Le post a été supprimé avec succès",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Une erreur s'est produite lors de la suppression du post",
    });
  }
};

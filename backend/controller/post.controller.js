const express = require("express");
const PostModel = require("../model/post.model");
const multer = require("multer");
const fs = require("fs");
module.exports.getPost = async (req, res) => {
  try {
    const posts = await PostModel.find();
    if (!posts || posts.length === 0) {
      // Vérifier si aucun post n'est trouvé
      return res.status(400).json({ message: "Aucune formation trouvé" });
    }
    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Une erreur s'est produite lors du chargement des formations.",
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
      const post = await PostModel.create({
        date_debut: req.body.date_d,
        date_fin: req.body.date_f,
        place: req.body.place,
        name: req.body.name,
        description: req.body.description,
        document_pdf: fileName,
        heure: req.body.heure,
        google_link: req.body.link,
      });
      console.log(req.body, post);
      res.status(200).json(post);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message:
          "Une erreur s'est produite lors de la création des formations.",
      });
    }
  },
];

module.exports.editePost = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    if (!post) {
      return res.status(400).json({ message: "Cette formation n'existe pas" });
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
      message:
        "Une erreur s'est produite lors de la mise à jour des formations",
    });
  }
};

module.exports.deletePost = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    if (!post) {
      return res.status(400).json({ message: "cette formation n'existe pas" });
    }
    //suppression du PDF associer
    const pdfPath = "./uploads/posts/pdf/" + post.document_pdf;
    fs.unlink(pdfPath, (err) => {
      if (err) {
        console.error(
          "Une erreur s'est produite lors de la suppression du fichier PDF :",
          err
        );
      }
    });
    await post.deleteOne({ _id: req.params.id });
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

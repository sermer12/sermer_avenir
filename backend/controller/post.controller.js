const express = require("express");
const PostModel = require("../model/post.model");
const multer = require("multer");

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

const pdfFilter = function (req, file, cb) {
  // Accept only pdf files
  if (!file.originalname.match(/\.(pdf)$/)) {
    const error = new Error("Seuls les fichiers PDF sont autorisés!");
    error.code = "FILE_TYPE";
    return cb(error, false);
  }
  cb(null, true);
};

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads/posts/pdf");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = "document_pdf_formation" + "-" + req.body.name;
      cb(null, uniqueSuffix + ".pdf");
    },
  }),
  fileFilter: pdfFilter,
});

const uploadMiddleware = upload.single("file");

module.exports.setPost = async (req, res) => {
  try {
    uploadMiddleware(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res
          .status(400)
          .json({ message: "Erreur de téléchargement de fichier" });
      } else if (err && err.code === "FILE_TYPE") {
        return res
          .status(400)
          .json({ message: "Seuls les fichiers PDF sont autorisés!" });
      } else if (err) {
        return res.status(500).json({
          message:
            "Une erreur s'est produite lors du téléchargement de fichier",
        });
      }

      const post = await PostModel.create({
        date: req.body.date,
        place: req.body.place,
        name: req.body.name,
        description: req.body.description,
        document_pdf: req.file ? req.file.path : null,
      });

      res.status(200).json(post);
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Une erreur s'est produite lors de la création des posts.",
    });
  }
};
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

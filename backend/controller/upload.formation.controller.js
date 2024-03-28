const express = require("express");
const UploadFormation = require("../model/upload.formation.model");
const multer = require("multer");
const { file } = require("pdfkit");

module.exports.getUploadPosts = async (req, res) => {
  try {
    const uploadPost = await UploadFormation.find();
    if (!uploadPost) {
      return res.status(400).json({ message: "ce post n'existe pas" });
    }
    return res.status(200).json(uploadPost);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Une erreur s'est produite lors du chargement des posts.",
    });
  }
};

const imageFilter = function (req, file, cb) {
  // Accept only image files
  if (!file.originalname.match(/\.(JPG|JPEG|PNG|GIF)$/)) {
    const error = new Error(
      "Seules les images (jpg, jpeg, png, gif) sont autorisées!"
    );
    error.code = "FILE_TYPE";
    return cb(error, false);
  }
  cb(null, true);
};

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads/posts/pictures"); // Remplacez par le chemin de votre dossier d'images
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = "image_upload_";
      cb(null, uniqueSuffix + file.originalname); // Pour conserver l'extension d'origine
    },
  }),
  fileFilter: imageFilter,
});

const uploadMiddleware = upload.single("file");

module.exports.setUploadPost = async (req, res) => {
  try {
    uploadMiddleware(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res
          .status(400)
          .json({ message: "Erreur de téléchargement de fichier" });
      } else if (err && err.code === "FILE_TYPE") {
        return res.status(400).json({
          message: "Seules les images (jpg, jpeg, png, gif) sont autorisées!",
        });
      } else if (err) {
        return res.status(500).json({
          message:
            "Une erreur s'est produite lors du téléchargement de fichier",
        });
      }

      const postUpload = await UploadFormation.create({
        description: req.body.description,
        picture: req.file ? req.file.path : null,
      });

      res.status(200).json(postUpload);
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message:
        "Une erreur s'est produite lors de la création des uploads." +
        error.message,
    });
  }
};

// module.exports.editeUploadPost = async (req, res) => {
//   try {
//     const uploadEdiit = await UploadFormation.findById(req.params.id);
//     if (!uploadEdiit) {
//       return res.status(400).json({ message: "ce  post n'existe pas" });
//     }
//     const updateUpload = await UploadFormation.findByIdAndUpdate(
//       uploadEdiit, // Utilisez l'ID du document
//       req.body,
//       { new: true }
//     );
//     res.status(200).json(updateUpload);
//   } catch (error) {
//     res.status(500).json({
//       message: "une erreur s'est produit lors de la mise a jours des posts",
//       error,
//     });
//   }
// };
module.exports.editeUploadPost = async (req, res) => {
  try {
    const uploadEdiit = await UploadFormation.findById(req.params.id);
    if (!uploadEdiit) {
      return res.status(400).json({ message: "ce post n'existe pas" });
    }

    // Vérifiez si un nouveau fichier est téléchargé
    if (req.file) {
      // Gérez le téléchargement du nouveau fichier
      const nouveauCheminfichier =
        "frontend/public/uploads/posts/picture/" + req.file.filename;

      // Supprimez le fichier image existant s'il existe
      if (uploadEdiit.picture) {
        // Utilisez fs.unlink ou votre méthode préférée pour supprimer le fichier
        fs.unlinkSync(uploadEdiit.picture);
      }

      // Mettez à jour le document avec le nouveau chemin de l'image
      uploadEdiit.picture = nouveauCheminfichier;
    }

    // Mettez à jour les autres champs
    uploadEdiit.description = req.body.description;

    // Enregistrez le document mis à jour
    const updateUpload = await uploadEdiit.save();

    res.status(200).json(updateUpload);
  } catch (error) {
    res.status(500).json({
      message: "une erreur s'est produite lors de la mise à jour des posts",
      error,
    });
  }
};

module.exports.deleteUploadPost = async (req, res) => {
  try {
    const postId = await UploadFormation.findById(req.params.id);
    if (!postId) {
      return res.status(400).json({ message: "ce post n'existe pas" });
    }
    await postId.deleteOne({ _id: req.params.id });
    res.status(200).json({
      message:
        "l'upload" + "" + " " + req.params.id + " " + "a ete bien supprimer",
    });
  } catch (error) {
    res.status(500).json({
      message: "une erreur s'est produit lors de la suppresion" + error,
    });
  }
};

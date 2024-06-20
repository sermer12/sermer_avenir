const express = require("express");
const FootersModel = require("../model/footer.model");

module.exports.getFooters = async (req, res) => {
  try {
    const footers = await FootersModel.find();
    if (!footers || footers.length === 0) {
      // Vérifier si aucun post n'est trouvé
      return res
        .status(400)
        .json({ message: "Aucun element du footer trouver" });
    }
    return res.status(200).json(footers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Une erreur s'est produite lors du chargement du footers.",
    });
  }
};

module.exports.setfooter = async (req, res) => {
  try {
    const post = await FootersModel.create({
      adresse: req.body.adresse,
      postal_ville: req.body.postal_ville,
      name_contact: req.body.name_contact,
      contact_role: req.body.contact_role,
      phone: req.body.phone,
      mail: req.body.mail,
    });

    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message:
        "Une erreur s'est produite lors de la création des éléments du footer.",
    });
  }
};

// module.exports.setfooter = async (req, res) => {
//   try {
//     const post = await FootersModel.create({
//       adresse: req.body.adresse,
//       postal_ville: req.body.postal_ville,
//       name_contact: req.body.name_contact,
//       contact_role: req.body.contact_role,
//       phone: req.body.phone,
//       mail: req.body.mail,
//     });

//     res.status(200).json(post);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       message:
//         "Une erreur s'est produite lors de la création des element du footer.",
//     });
//   }
// };

module.exports.editeFooter = async (req, res) => {
  try {
    const post = await FootersModel.findById(req.params.id);
    if (!post) {
      return res.status(400).json({ message: "Ce footer n'existe pas" });
    }

    const updatePost = await FootersModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatePost);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Une erreur s'est produite lors de la mise à jour du footer",
    });
  }
};

// module.exports.deletePost = async (req, res) => {
//   try {
//     const post = await PostModel.findById(req.params.id);
//     if (!post) {
//       return res.status(400).json({ message: "cette formation n'existe pas" });
//     }
//     //suppression du PDF associer
//     const pdfPath = "./uploads/posts/pdf/" + post.document_pdf;
//     fs.unlink(pdfPath, (err) => {
//       if (err) {
//         console.error(
//           "Une erreur s'est produite lors de la suppression du fichier PDF :",
//           err
//         );
//       }
//     });
//     await post.deleteOne({ _id: req.params.id });
//     res.status(200).json({
//       message:
//         "le poste " + "" + " " + req.params.id + " " + "a ete bien supprimer",
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "une erreur s'est produit lors de la suppresion" + error,
//     });
//   }
// };

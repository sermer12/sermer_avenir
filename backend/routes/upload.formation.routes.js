const express = require("express");
const multer = require("multer");
const upload = multer();

const {
  setUploadPost,
  getUploadPosts,
  editeUploadPost,
  deleteUploadPost,
} = require("../controller/upload.formation.controller");
const routeur = express.Router();

routeur.post("/", setUploadPost);
routeur.get("/", getUploadPosts);
routeur.put("/:id", editeUploadPost);
routeur.delete("/:id", deleteUploadPost);
module.exports = routeur;

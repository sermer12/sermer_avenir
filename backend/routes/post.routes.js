const express = require("express");

const {
  setPost,
  getPost,
  deletePost,
  editePost,
} = require("../controller/post.controller");
const routeur = express.Router();

routeur.post("/", setPost);
routeur.get("/", getPost);
routeur.put("/:id", editePost);
routeur.delete("/:id", deletePost);
module.exports = routeur;

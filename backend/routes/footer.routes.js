const express = require("express");

const {
  editeFooter,
  getFooters,
  setfooter,
} = require("../controller/footer.controller");
const routeur = express.Router();

routeur.post("/", setfooter);
routeur.get("/", getFooters);
routeur.put("/:id", editeFooter);
// routeur.delete("/:id", deletePost);
module.exports = routeur;

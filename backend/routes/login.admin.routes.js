const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin.controller");
// Route pour la page de connexion des admins
router.post("/", adminController.login);

module.exports = router;

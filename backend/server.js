const express = require("express");
const connectDb = require("./config/db");
const dotenv = require("dotenv").config();
const multer = require("multer");
const port = 5000;

//connexion a la db
connectDb();

const app = express();
//lancer server

//middlewer pour traiter la  request
app.use(express.json());
app.use(express.urlencoded());
const storage = multer.memoryStorage(); // Vous pouvez ajuster cela pour enregistrer les fichiers sur le disque si nécessaire
const upload = multer({ storage: storage });

app.use(upload.any());
//route
app.use("/post", require("./routes/post.routes"));
app.use("/upload_post", require("./routes/upload.formation.routes"));
app.listen(port, () => console.log("le server demarre au port" + " " + port));

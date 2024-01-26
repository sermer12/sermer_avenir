const express = require("express");
const connectDb = require("./config/db");
const dotenv = require("dotenv").config();
const port = 5000;

//connexion a la db
connectDb();

const app = express();
//lancer server

//middlewer pour traiter la  request
app.use(express.json());
app.use(express.urlencoded());
//route
app.use("/post", require("./routes/post.routes"));
app.use("/upload_post", require("./routes/upload.formation.routes"));
app.listen(port, () => console.log("le server demarre au port" + " " + port));

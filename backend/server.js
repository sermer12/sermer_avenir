const express = require("express");
const connectDb = require("./config/db");
require("dotenv").config();
const cors = require("cors");
const port = 5000;

//connexion a la db
connectDb();

const app = express();

//Authorisation CORS

app.use(
  cors({
    origin: "http://127.0.0.1:5173",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

//middlewer pour traiter la  request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//route
app.use("/post", require("./routes/post.routes"));
app.use("/upload_post", require("./routes/upload.formation.routes"));
app.use("/dashboard", require("./routes/login.admin.routes"));
//lancer server
app.listen(port, () => console.log("le server demarre au port" + " " + port));
